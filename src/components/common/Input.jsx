export default function Input({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
  }) {
    return (
      <div className="mb-3">
        {label && (
          <label className="block text-sm mb-1">{label}</label>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
    );
  }
  