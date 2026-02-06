export default function TimeFilter({ value, onChange }) {
    return (
      <div className="mb-6 flex gap-4">
        {["week", "month", "year"].map((p) => (
          <button
            key={p}
            className={`px-4 py-2 rounded font-semibold ${
              value === p ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => onChange(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    );
  }
  