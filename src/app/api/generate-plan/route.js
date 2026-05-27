import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an Indian nutrition expert creating healthy meal plans.",
        },

        {
          role: "user",
          content: `
Create ONLY 4 meal names.

STRICT FORMAT:

Breakfast: meal name
Lunch: meal name
Snack: meal name
Dinner: meal name

Do NOT explain anything.
Do NOT create a 7-day plan.
Do NOT add extra text.

Goal:
${body.goal}
`,
        },
      ],

      model: "llama-3.1-8b-instant",
    });

    const aiText =
      completion.choices[0]?.message?.content || "";

    const lines = aiText
      .split("\n")
      .map((line) =>
        line
          .replace("Breakfast:", "")
          .replace("Lunch:", "")
          .replace("Snack:", "")
          .replace("Dinner:", "")
          .trim()
      )
      .filter((line) => line !== "");

    const meals = {
      breakfast: lines[0] || "Oats Upma",
      lunch: lines[1] || "Dal Rice",
      snack: lines[2] || "Fruit Bowl",
      dinner: lines[3] || "Roti and Paneer",
    };

    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return Response.json({
      plan: {
        goal_summary: `${body.goal} - AI Diet Plan`,
        daily_calories: 2200,
        tip: "AI-generated personalized Indian meal plan.",

        days: weekDays.map((day) => ({
          day,
          total_calories: 2200,

          meals: {
            breakfast: {
              emoji: "🥣",
              name: meals.breakfast,
              description: "AI-generated breakfast",
              calories: 400,
            },

            lunch: {
              emoji: "🍛",
              name: meals.lunch,
              description: "AI-generated lunch",
              calories: 700,
            },

            snack: {
              emoji: "🍎",
              name: meals.snack,
              description: "AI-generated snack",
              calories: 200,
            },

            dinner: {
              emoji: "🥗",
              name: meals.dinner,
              description: "AI-generated dinner",
              calories: 500,
            },
          },
        })),
      },
    });

  } catch (error) {

    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}