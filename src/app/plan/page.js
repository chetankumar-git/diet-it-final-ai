"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
const MEAL_LABELS = {
  breakfast: { label: "Breakfast", time: "8:00 AM" },
  lunch: { label: "Lunch", time: "1:00 PM" },
  snack: { label: "Snack", time: "4:30 PM" },
  dinner: { label: "Dinner", time: "8:00 PM" },
};

export default function PlanPage() {
  const [plan, setPlan] = useState(null);
  const [goal, setGoal] = useState("");
  const [activeDay, setActiveDay] = useState(0);
  const [recipe, setRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("diet_plan");
    const savedGoal = localStorage.getItem("diet_goal");
    if (!saved) { router.push("/"); return; }
    setPlan(JSON.parse(saved));
    setGoal(savedGoal || "");
  }, []);

  async function fetchRecipe(dishName) {
    setLoadingRecipe(dishName);
    setRecipe(null);
    try {
      const res = await fetch("/api/get-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dish: dishName }),
      });
      const data = await res.json();
      setRecipe(data.recipe);
    } catch {
      alert("Couldn't load recipe. Try again.");
    } finally {
      setLoadingRecipe("");
    }
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#111" }}>
        <div className="spinner" />
      </div>
    );
  }

  const day = plan.days[activeDay];

  return (
    <div className="min-h-screen" style={{ background: "#111" }}>
      <Navbar />

      {/* Header */}
      <div className="px-4 py-6 border-b" style={{ borderColor: "#1a1a1a", background: "#0d0d0d" }}>
        <p className="text-xs mb-1" style={{ color: "#e53935" }}>YOUR 7-DAY PLAN</p>
        <h1 className="font-display text-4xl tracking-wide mb-2">{plan.goal_summary}</h1>
        <p className="text-xs text-gray-500 italic">"{goal}"</p>

        {/* Stats row */}
        <div className="flex gap-3 mt-4">
          {[
            { label: "Daily Target", val: `${plan.daily_calories} kcal` },
            { label: "Meals/Day", val: "4" },
            { label: "Duration", val: "7 Days" },
          ].map((s) => (
            <div key={s.label} className="px-4 py-2 rounded-md text-center" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
              <div className="text-lg font-semibold" style={{ color: "#e53935" }}>{s.val}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {plan.tip && (
          <div className="mt-4 p-3 rounded-md text-sm text-gray-300" style={{ background: "#1a0000", border: "1px solid #500" }}>
            💡 {plan.tip}
          </div>
        )}
      </div>

      {/* Day selector */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto" style={{ background: "#0d0d0d" }}>
        {plan.days.map((d, i) => (
          <button
            key={d.day}
            onClick={() => { setActiveDay(i); setRecipe(null); }}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-all"
            style={{
              background: activeDay === i ? "#e53935" : "#1a1a1a",
              color: activeDay === i ? "#fff" : "#aaa",
              border: `1px solid ${activeDay === i ? "#e53935" : "#2a2a2a"}`,
            }}
          >
            {d.day}
          </button>
        ))}
      </div>

      {/* Meals */}
      <div className="max-w-2xl mx-auto px-4 py-6 fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-2xl tracking-wide">{day.day}'s <span style={{ color: "#e53935" }}>Meals</span></h2>
          <span className="text-xs text-gray-500">{day.total_calories} kcal total</span>
        </div>

        <div className="flex flex-col gap-3">
          {Object.entries(day.meals).map(([key, meal]) => (
            <div
              key={key}
              className="meal-card rounded-lg p-4 cursor-pointer transition-all"
              style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
              onClick={() => fetchRecipe(meal.name)}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{meal.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: "#2a0000", color: "#f88" }}>
                      {MEAL_LABELS[key].label}
                    </span>
                    <span className="text-xs text-gray-600">{MEAL_LABELS[key].time}</span>
                  </div>
                  <div className="font-medium text-sm">{meal.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{meal.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium" style={{ color: "#e53935" }}>{meal.calories}</div>
                  <div className="text-xs text-gray-600">kcal</div>
                </div>
              </div>

              {/* Recipe inline */}
              {loadingRecipe === meal.name && (
                <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-gray-500" style={{ borderColor: "#2a2a2a" }}>
                  <span className="spinner" /> Loading recipe...
                </div>
              )}
              {recipe && recipe.dish === meal.name && (
                <div className="mt-3 pt-3 border-t fade-in" style={{ borderColor: "#333" }}>
                  <div className="flex gap-4 text-xs text-gray-400 mb-3">
                    <span>⏱ Prep: {recipe.prep_time}</span>
                    <span>🍳 Cook: {recipe.cook_time}</span>
                    <span>👥 Serves: {recipe.servings}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-medium mb-2" style={{ color: "#e53935" }}>Ingredients</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i} className="flex gap-1.5"><span style={{ color: "#e53935" }}>·</span>{ing}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-2" style={{ color: "#e53935" }}>Steps</div>
                      <ol className="text-xs text-gray-300 space-y-1">
                        {recipe.steps.map((s, i) => (
                          <li key={i}><span style={{ color: "#e53935" }}>{i + 1}.</span> {s}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3 pt-3 border-t" style={{ borderColor: "#2a2a2a" }}>
                    {Object.entries(recipe.nutrition).map(([k, v]) => (
                      <div key={k} className="text-center">
                        <div className="text-xs font-medium" style={{ color: "#e53935" }}>{v}</div>
                        <div className="text-xs text-gray-600 capitalize">{k}</div>
                      </div>
                    ))}
                  </div>
                  {recipe.tip && (
                    <p className="text-xs text-gray-400 mt-3 italic">💡 {recipe.tip}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-gray-600 mt-6">Tap any meal to see the recipe</p>
      </div>
    </div>
  );
}
