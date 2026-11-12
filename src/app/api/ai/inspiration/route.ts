import { NextResponse } from "next/server";
import { CURATED_INSPIRATIONS, InspirationItem } from "@/lib/inspirationData";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      category = "birthday",
      recipientName = "My Love",
      senderName = "With All My Heart",
      tone = "Deep & Romantic",
      details = "",
      slot = 1, // Slot 1 = Initial 10, Slot 2 = Regeneration 10
    } = body;

    const apiKey = process.env.GROQ_API_KEY;

    // If Groq API Key is configured, perform AI Generation via Groq LLM (llama-3.3-70b-versatile)
    if (apiKey) {
      try {
        const isRegenSlot = slot === 2;
        const systemPrompt = `You are an internationally acclaimed epistolary author, poet laureate, and master luxury ghostwriter for Candlelit — the world's premier digital celebration platform.

Your task is to craft EXACTLY 10 distinct, emotionally profound, evocative, and unforgettable celebration messages/letters tailored to the requested occasion.

Parameters:
- Category / Occasion: ${category}
- Recipient Name: ${recipientName}
- Sender Name: ${senderName}
- Primary Tone Style: ${tone}
- Batch / Generation Slot: ${slot} of 2 ${
          isRegenSlot
            ? "(CRITICAL: This is a REGENERATION batch! Produce 10 COMPLETELY FRESH, NOVEL metaphors, sensory angles, and storytelling perspectives distinct from common tropes!)"
            : ""
        }
${details ? `- Special personal memories / inside jokes / life details to weave in: ${details}` : ""}

Content & Craftsmanship Rules:
1. Generate EXACTLY 10 options.
2. Each option must have a unique, evocative title (3-5 words) and a distinct emotional sub-tone (e.g. "Cinematic & Soulful", "Playful Warmth", "Tearjerker & Vulnerable", "Timeless Devotion", "Whimsical & Sweet", "Cosmic Poetry", "Quiet Sanctuary", "Grand Milestone", "Heartfelt Gratitude", "Midnight Secret").
3. Messages must be 2 to 4 rich sentences long. Stream like authentic literature, not generic greeting cards.
4. Weave in the recipient's name ("${recipientName}") and the sender's feeling naturally.

Return STRICTLY a valid JSON object matching this schema:
{
  "options": [
    {
      "id": "ai-${slot}-1",
      "title": "Evocative 3-5 word title",
      "text": "The full personalized message text",
      "tone": "Specific emotional tone"
    },
    ... (exactly 10 options, id from ai-${slot}-1 to ai-${slot}-10)
  ]
}`;

        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content:
                  "You are Candlelit's master copywriter. You respond strictly with valid JSON without markdown wrapping or preamble.",
              },
              { role: "user", content: systemPrompt },
            ],
            response_format: { type: "json_object" },
            temperature: isRegenSlot ? 0.9 : 0.78,
            max_tokens: 3000,
          }),
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          const rawContent = data.choices?.[0]?.message?.content;
          if (rawContent) {
            const parsed = JSON.parse(rawContent);
            if (Array.isArray(parsed.options) && parsed.options.length >= 8) {
              return NextResponse.json({
                success: true,
                source: "groq-ai",
                slot,
                options: parsed.options.slice(0, 10),
              });
            }
          }
        }
      } catch (aiError) {
        console.warn("Groq API call encountered an issue, falling back to curated library:", aiError);
      }
    }

    // High-fidelity fallback: Return 10 curated variations tailored to the requested slot
    const filtered = CURATED_INSPIRATIONS.filter((item) => item.category === category);
    const pool = filtered.length > 0 ? filtered : CURATED_INSPIRATIONS;

    // Slot 1 gets items 0..9, Slot 2 gets items 10..19 (or cyclic slice if < 20)
    const startIndex = slot === 2 ? 10 : 0;
    let selectedSlice = pool.slice(startIndex, startIndex + 10);
    if (selectedSlice.length < 10) {
      // Pad cyclically to guarantee exactly 10 high quality choices
      selectedSlice = [...selectedSlice, ...pool.slice(0, 10 - selectedSlice.length)];
    }

    const personalized: InspirationItem[] = selectedSlice.slice(0, 10).map((item, idx) => ({
      ...item,
      id: `curated-slot${slot}-${idx + 1}`,
      text: item.text.replace(/my love/gi, recipientName || "my love"),
    }));

    return NextResponse.json({
      success: true,
      source: "curated-master",
      slot,
      options: personalized,
    });
  } catch (error) {
    console.error("Inspiration API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate inspiration options" },
      { status: 500 }
    );
  }
}
