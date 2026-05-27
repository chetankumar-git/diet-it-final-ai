export default function Navbar() {
  return (
    <nav
      className="w-full px-6 py-4 flex justify-between items-center"
      style={{
        background: "#111",
        borderBottom: "1px solid #222",
      }}
    >
      <h1
        className="text-2xl font-bold"
        style={{ color: "#e53935" }}
      >
        Diet-IT
      </h1>

      <p className="text-sm text-gray-400">
        AI Indian Diet Planner
      </p>
    </nav>
  );
}