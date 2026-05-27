import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { dish } = await req.json();
    if (!dish) return Response.json({ error: "Dish name required" }, { status: 400 });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Give me a simple home-style Indian recipe for "${dish}".

Return ONLY this JSON (no markdown):
{
  "dish": "${dish}",
  "servings": 2,
  "prep_time": "10 mins",
  "cook_time": "20 mins",
  "calories_per_serving": 280,
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["step 1", "step 2"],
  "nutrition": { "protein": "12g", "carbs": "40g", "fat": "8g", "fiber": "5g" },
  "tip": "one helpful cooking or health tip"
}`,
        },
      ],
    });

    const raw = message.content[0].text.trim();
    const clean = raw.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
    const recipe = JSON.parse(clean);

    return Response.json({ recipe });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Failed to get recipe." }, { status: 500 });
  }
}
