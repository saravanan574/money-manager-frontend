import { useState, useEffect } from "react";

const categories = ["Fuel", "Movie", "Food", "Loan", "Medical", "Shopping", "Transport", "Other"];
const divisions = ["Personal", "Office"];

export default function TransactionForm({ type, onClose, onSave }) {
  const [form, setForm] = useState({
    type,
    amount: "",
    category: categories[0],
    division: divisions[0],
    account: "Cash",
    description: "",
    date: new Date().toISOString().slice(0, 16),
  });

  // ✅ Sync form.type whenever prop `type` changes
  useEffect(() => {
    setForm((prev) => ({ ...prev, type }));
  }, [type]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = () => {
    if (!form.amount || !form.description) {
      alert("Please fill all required fields!");
      return;
    }

    if (onSave) onSave(form);
    if (onClose) onClose();
  };

  return (
    <div className="transaction-modal-backdrop" onClick={onClose}>
      <div className="transaction-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Add {form.type.charAt(0).toUpperCase() + form.type.slice(1)} Transaction
        </h2>

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />

        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>

        <select
          value={form.division}
          onChange={(e) => handleChange("division", e.target.value)}
        >
          {divisions.map(div => <option key={div}>{div}</option>)}
        </select>

        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />

        <input
          type="text"
          placeholder="One-line description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <button className="save-btn" onClick={handleSubmit}>
          Save {form.type.charAt(0).toUpperCase() + form.type.slice(1)} Transaction
        </button>
      </div>
    </div>
  );
}
