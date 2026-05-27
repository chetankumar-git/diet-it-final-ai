"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
const QUICK_TAGS = [
  { label: "🥗 Vegetarian", prompt: "I want a healthy vegetarian Indian diet plan for weight loss" },
  { label: "💪 High Protein", prompt: "I need a high protein Indian meal plan for muscle building" },
  { label: "🩺 Diabetic Friendly", prompt: "I need a diabetic friendly low sugar Indian diet plan" },
  { label: "🔥 Weight Loss", prompt: "I want to lose weight with simple Indian home-cooked meals" },
  { label: "🥚 Eggetarian", prompt: "Give me an eggetarian Indian diet plan for a healthy lifestyle" },
  { label: "🎲 Surprise me!", prompt: "Surprise me with a fun and healthy Indian meal plan" },
];

const TIPS = [
  "Dal is one of the cheapest and most protein-rich foods in Indian cooking.",
  "Eating curd (dahi) daily helps with digestion and gut health.",
  "Roti made from whole wheat or jowar flour is much better than maida.",
  "Ghee in small amounts is actually healthy — don't cut it out completely!",
  "Turmeric in your food every day = free anti-inflammation.",
  "Buttermilk (chaas) is the ultimate summer drink — zero guilt.",
];

export default function Home() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];

  async function handleGenerate(text) {
    const query = text || goal;
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      localStorage.setItem("diet_plan", JSON.stringify(data.plan));
      localStorage.setItem("diet_goal", query);
      router.push("/plan");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#111" }}>
      <Navbar />

      {/* Hero */}
      <div className="text-center px-4 pt-14 pb-10" style={{ background: "linear-gradient(180deg, #1a0000 0%, #111 100%)" }}>
        <p className="text-xs tracking-widest mb-3" style={{ color: "#e53935" }}>YOUR PERSONAL INDIAN FOOD NUTRITIONIST</p>
        <h1 className="font-display text-6xl md:text-8xl mb-3" style={{ lineHeight: 1 }}>
          EAT <span style={{ color: "#e53935" }}>SMART.</span><br />EAT INDIAN.
        </h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto mt-4 mb-8">
          Tell us your health goal and get a full 7-day Indian meal plan — breakfast to dinner — all home-cooked, all real food.
        </p>

        {/* Input */}
        <div className="max-w-xl mx-auto">
          <div className="flex gap-2 p-1 rounded-lg" style={{ background: "#1a1a1a", border: "1px solid #333" }}>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. I want to lose 5kg eating simple Indian food..."
              className="flex-1 bg-transparent text-sm text-white px-3 py-2.5 outline-none placeholder-gray-600"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={loading || !goal.trim()}
              className="px-5 py-2.5 rounded-md text-sm font-medium transition-all"
              style={{
                background: loading || !goal.trim() ? "#4a1a1a" : "#e53935",
                color: loading || !goal.trim() ? "#666" : "#fff",
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="spinner" /> Planning...
                </span>
              ) : "Plan it ✦"}
            </button>
          </div>

          {error && <p className="text-xs mt-2" style={{ color: "#e53935" }}>⚠ {error}</p>}

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {QUICK_TAGS.map((t) => (
              <button
                key={t.label}
                onClick={() => { setGoal(t.prompt); handleGenerate(t.prompt); }}
                disabled={loading}
                className="px-3 py-1.5 rounded-full text-xs transition-all hover:border-red-600"
                style={{ background: "#1a0000", border: "1px solid #500", color: "#f88" }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Did you know */}
      <div className="max-w-xl mx-auto px-4 mb-8">
        <div className="rounded-lg p-4" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
          <p className="text-xs mb-1" style={{ color: "#e53935" }}>💡 Did you know?</p>
          <p className="text-sm text-gray-300">{tip}</p>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <h2 className="font-display text-3xl text-center mb-8 tracking-wide">HOW IT <span style={{ color: "#e53935" }}>WORKS</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { num: "01", title: "Tell your goal", desc: "Type what you want — lose weight, gain muscle, manage diabetes, or just eat healthy." },
            { num: "02", title: "AI builds your plan", desc: "Our AI creates a 7-day Indian meal plan with breakfast, lunch, snack & dinner." },
            { num: "03", title: "Cook & track", desc: "See recipes, calorie counts, and tips for every meal. Simple as that." },
          ].map((s) => (
            <div key={s.num} className="p-4 rounded-lg" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
              <div className="font-display text-4xl mb-2" style={{ color: "#e53935" }}>{s.num}</div>
              <div className="font-medium text-sm mb-1">{s.title}</div>
              <div className="text-xs text-gray-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center py-6 border-t" style={{ borderColor: "#1a1a1a" }}>
        <p className="text-xs text-gray-600">Diet-IT · Your personal Indian food nutritionist · Powered by AI</p>
      </footer>
    </div>
  );
}
