import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SurpriseData } from "@/types/candlelit";

// Server-side persistent backup directory
const DATA_DIR = path.join(process.cwd(), ".data", "surprises");

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("Could not create local data dir:", err);
  }
}

function saveLocalServerBackup(surprise: SurpriseData) {
  try {
    ensureDataDir();
    const cleanSlug = surprise.slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
    const filePath = path.join(DATA_DIR, `${cleanSlug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(surprise, null, 2), "utf8");

    // Also write by ID for backup index
    if (surprise.id) {
      const idPath = path.join(DATA_DIR, `id-${surprise.id}.json`);
      fs.writeFileSync(idPath, JSON.stringify(surprise, null, 2), "utf8");
    }
  } catch (err) {
    console.warn("Error saving server backup:", err);
  }
}

function getLocalServerBackup(slug: string): SurpriseData | null {
  try {
    ensureDataDir();
    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
    const filePath = path.join(DATA_DIR, `${cleanSlug}.json`);

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      return JSON.parse(raw);
    }

    // Try finding by ID
    const idPath = path.join(DATA_DIR, `id-${cleanSlug}.json`);
    if (fs.existsSync(idPath)) {
      const raw = fs.readFileSync(idPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Error reading server backup:", err);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const surprise = (await req.json()) as SurpriseData;

    if (!surprise || !surprise.slug) {
      return NextResponse.json({ error: "Invalid surprise data" }, { status: 400 });
    }

    // 1. Always save to local server file system backup first
    saveLocalServerBackup(surprise);

    // 2. Save to Supabase database if configured
    let supabaseSaved = false;
    let supabaseError = null;

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("surprises").upsert({
          id: surprise.id,
          slug: surprise.slug,
          template_id: surprise.templateId,
          recipient_name: surprise.recipientName,
          sender_name: surprise.senderName,
          user_id: surprise.userId || null,
          data: surprise,
          created_at: surprise.createdAt || new Date().toISOString(),
        });

        if (error) {
          console.warn("Supabase upsert warning:", error);
          supabaseError = error.message;
        } else {
          supabaseSaved = true;
        }
      } catch (sbErr) {
        console.warn("Supabase connection exception:", sbErr);
        supabaseError = sbErr instanceof Error ? sbErr.message : String(sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      slug: surprise.slug,
      id: surprise.id,
      supabaseSaved,
      supabaseError,
    });
  } catch (err: unknown) {
    console.error("API /api/surprises error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save surprise" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  // 1. Try Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("surprises")
        .select("data")
        .eq("slug", slug)
        .single();

      if (!error && data?.data) {
        return NextResponse.json({ success: true, surprise: data.data });
      }
    } catch {
      // Fall through to server backup
    }
  }

  // 2. Try Server Backup file
  const localBackup = getLocalServerBackup(slug);
  if (localBackup) {
    return NextResponse.json({ success: true, surprise: localBackup });
  }

  return NextResponse.json({ error: "Surprise not found" }, { status: 404 });
}

