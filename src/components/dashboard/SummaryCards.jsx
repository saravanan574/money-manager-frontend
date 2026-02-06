export default function SummaryCards({ income, expense, balance }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Income</h2>
        <p className="text-2xl font-bold">₹{income}</p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Expense</h2>
        <p className="text-2xl font-bold">₹{expense}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Balance</h2>
        <p className="text-2xl font-bold">₹{balance}</p>
      </div>
    </div>
  );
}
