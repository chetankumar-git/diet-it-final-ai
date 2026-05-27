"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

const GOALS = ["Weight Loss", "Muscle Gain", "Diabetic Friendly", "Heart Healthy", "General Wellness"];
const FOOD_TYPES = ["Vegetarian", "Eggetarian", "Non-Vegetarian"];
const REGIONS = ["North Indian", "South Indian", "West Indian", "East Indian", "Mix of everything"];

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", age: "", weight: "", height: "", goal: "", food: "", region: "" });
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const p = localStorage.getItem("diet_profile");
    if (p) setForm(JSON.parse(p));
  }, []);

  function handleChange(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleSave() {
    localStorage.setItem("diet_profile", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleGenerateWithProfile() {
    if (!form.goal || !form.food) return alert("Please select goal and food type.");
    const prompt = `I am ${form.name || "a user"}, ${form.age || "adult"} years old, weighing ${form.weight || "average"} kg. My goal is ${form.goal}. I prefer ${form.food} ${form.region} food. Create a meal plan for me.`;
    localStorage.setItem("diet_goal", prompt);
    router.push("/");
  }

  const inputStyle = {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    color: "#fff",
    borderRadius: "6px",
    padding: "10px 12px",
    fontSize: "13px",
    width: "100%",
    outline: "none",
  };

  const chipStyle = (active) => ({
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    cursor: "pointer",
    border: `1px solid ${active ? "#e53935" : "#2a2a2a"}`,
    background: active ? "#2a0000" : "#1a1a1a",
    color: active ? "#f88" : "#aaa",
    transition: "all 0.15s",
  });

  return (
    <div className="min-h-screen" style={{ background: "#111" }}>
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-8">
        <p className="text-xs tracking-widest mb-1" style={{ color: "#e53935" }}>YOUR DETAILS</p>
        <h1 className="font-display text-4xl tracking-wide mb-8">YOUR <span style={{ color: "#e53935" }}>PROFILE</span></h1>

        <div className="space-y-5">
          {/* Basic */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Name</label>
              <input style={inputStyle} placeholder="Your name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Age</label>
              <input style={inputStyle} placeholder="e.g. 28" type="number" value={form.age} onChange={(e) => handleChange("age", e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Weight (kg)</label>
              <input style={inputStyle} placeholder="e.g. 70" type="number" value={form.weight} onChange={(e) => handleChange("weight", e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Height (cm)</label>
              <input style={inputStyle} placeholder="e.g. 170" type="number" value={form.height} onChange={(e) => handleChange("height", e.target.value)} />
            </div>
          </div>

          {/* Goal */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Health Goal</label>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <button key={g} style={chipStyle(form.goal === g)} onClick={() => handleChange("goal", g)}>{g}</button>
              ))}
            </div>
          </div>

          {/* Food type */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Food Preference</label>
            <div className="flex flex-wrap gap-2">
              {FOOD_TYPES.map((f) => (
                <button key={f} style={chipStyle(form.food === f)} onClick={() => handleChange("food", f)}>{f}</button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Regional Cuisine Preference</label>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button key={r} style={chipStyle(form.region === r)} onClick={() => handleChange("region", r)}>{r}</button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-md text-sm font-medium transition-all"
              style={{ background: saved ? "#1a4a1a" : "#1a1a1a", border: "1px solid #333", color: saved ? "#4f4" : "#aaa" }}
            >
              {saved ? "✓ Saved!" : "Save Profile"}
            </button>
            <button
              onClick={handleGenerateWithProfile}
              className="flex-1 py-2.5 rounded-md text-sm font-medium"
              style={{ background: "#e53935", color: "#fff" }}
            >
              Generate My Plan ✦
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
