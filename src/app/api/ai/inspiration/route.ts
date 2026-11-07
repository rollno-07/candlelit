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
    } = body;

    const apiKey = process.env.GROQ_API_KEY;

    // If Groq API Key is configured, perform AI Generation via Groq LLM
    if (apiKey) {
      try {
        const systemPrompt = `You are an elite, poetic luxury copywriter for Candlelit, a high-end digital surprise celebration platform.
Your task is to craft 3 distinct, emotionally profound, evocative, and beautifully phrased celebration messages/letters tailored to the requested occasion.

Guidelines:
- Category: ${category}
- Recipient Name: ${recipientName}
- Sender Name: ${senderName}
- Desired Tone: ${tone}
${details ? `- Extra details / memories to weave in: ${details}` : ""}

Return strictly a valid JSON object matching this schema:
{
  "options": [
    {
      "id": "ai-1",
      "title": "Short poetic title (3-5 words)",
      "text": "The message body (2-4 sentences, deeply touching and cinematic)",
      "tone": "e.g. Poetic & Emotional"
    },
    {
      "id": "ai-2",
      "title": "Short poetic title",
      "text": "The message body",
      "tone": "e.g. Warm & Playful"
    },
    {
      "id": "ai-3",
      "title": "Short poetic title",
      "text": "The message body",
      "tone": "e.g. Unforgettable & Deep"
    }
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
              { role: "system", content: "You respond only with valid JSON." },
              { role: "user", content: systemPrompt },
            ],
            response_format: { type: "json_object" },
            temperature: 0.75,
            max_tokens: 800,
          }),
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          const rawContent = data.choices?.[0]?.message?.content;
          if (rawContent) {
            const parsed = JSON.parse(rawContent);
            if (Array.isArray(parsed.options) && parsed.options.length > 0) {
              return NextResponse.json({
                success: true,
                source: "groq-ai",
                options: parsed.options,
              });
            }
          }
        }
      } catch (aiError) {
        console.warn("Groq API call encountered an error, falling back to curated library:", aiError);
      }
    }

    // Fallback: Return curated library personalized with recipient name
    const filtered = CURATED_INSPIRATIONS.filter((item) => item.category === category);
    const pool = filtered.length > 0 ? filtered : CURATED_INSPIRATIONS.slice(0, 3);

    const personalized: InspirationItem[] = pool.map((item, idx) => ({
      ...item,
      id: `curated-${idx + 1}`,
      text: item.text.replace(/my love/gi, recipientName || "my love"),
    }));

    return NextResponse.json({
      success: true,
      source: "curated-fallback",
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

