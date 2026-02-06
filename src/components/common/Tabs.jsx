export default function Tabs({ tabs, active, onChange }) {
    return (
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 font-medium ${
              active === tab
                ? "border-b-2 border-black"
                : "text-gray-400"
            }`}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  