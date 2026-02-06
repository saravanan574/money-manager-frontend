import { useEffect, useState } from "react";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import { getDashboardData } from "../services/api";
import "../styles/global.css";

export default function Dashboard() {
  const [period, setPeriod] = useState("week");
  const [data, setData] = useState({ income: 0, expense: 0, balance: 0, transactions: [] });
  const [open, setOpen] = useState(false);

  // Filters for transaction history
  const [filters, setFilters] = useState({
    type: "All",
    category: "All",
    division: "All",
    startDate: "",
    endDate: ""
  });

  const loadDashboard = async () => {
    const res = await getDashboardData(period);
    setData(res);
  };

  useEffect(() => {
    loadDashboard();
  }, [period]);

  // ----------------------------
  // Transaction History Filters (independent of period)
  // ----------------------------
  const filteredTransactions = data.transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const matchType = filters.type === "All" || tx.type === filters.type;
    const matchCategory = filters.category === "All" || tx.category === filters.category;
    const matchDivision = filters.division === "All" || tx.division === filters.division;
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;
    const matchDate = (!start || txDate >= start) && (!end || txDate <= end);
    return matchType && matchCategory && matchDivision && matchDate;
  }).slice().reverse();

  // ----------------------------
  // Stacked Bar Totals (based on period only)
  // ----------------------------
  let periodStart = new Date();
  if (period === "week") periodStart.setDate(periodStart.getDate() - 7);
  else if (period === "month") periodStart.setMonth(periodStart.getMonth() - 1);
  else if (period === "year") periodStart.setFullYear(periodStart.getFullYear() - 1);

  const periodTransactions = data.transactions.filter(tx => new Date(tx.date) >= periodStart);
  const totalIncome = periodTransactions
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = periodTransactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const total = totalIncome + totalExpense || 1;
  const incomePercent = (totalIncome / total) * 100;
  const expensePercent = (totalExpense / total) * 100;
  // Count active filters
  const filterCount = Object.values(filters).filter(v => v !== "All" && v !== "").length;

  // Filter options
  const categories = ["All", ...new Set(data.transactions.map(t => t.category))];
  const divisions = ["All", ...new Set(data.transactions.map(t => t.division))];

  return (
    <div className="container">

      {/* Header */}

      {/* Period Tabs */}
      <div className="period-tabs">
        {["week", "month", "year"].map(p => (
          <div
            key={p}
            className={`period-tab ${period === p ? "active" : ""}`}
            onClick={() => setPeriod(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </div>
        ))}
      </div>

      {/* Single Stacked Bar */}
      <div className="stacked-bar-container">
        <div className="stacked-bar" style={{display:"flex",color:"white"}} >
          <div  style={{ width: `${incomePercent > 100?incomePercent:10}%` ,textAlign:"center", backgroundColor:"green"}}>
            {totalIncome > 0 && <span className="bar-label">₹{totalIncome}</span>}
          </div>
          <div  style={{ width: `${expensePercent}% `,backgroundColor:"red" , textAlign:"center"}}>
            {totalExpense > 0 && <span className="bar-label">₹{totalExpense}</span>}
          </div>
        </div>
      </div>
      <div style = {{display:"flex",justifyContent:"space-around",backgroundColor:"white",border:"1px",borderRadius:"5%",marginBottom:"20px"}}>
        <div style = {{color:"green"}}>
        <h3>Income amount : {totalIncome}</h3>
        <h3>Percentage : {Math.round(incomePercent)}%</h3>
        </div>
        <div style = {{color:"red"}}>
        <h3>Expense amount : {totalExpense}</h3>
        <h3>Percentage : {Math.round(expensePercent)}%</h3>
        </div>
      </div>

      {/* Transaction History Header + Filters */}
      <div className="history-header">
        <div>
          <h2 className="section-title">Transaction History</h2>
          <div className="filter-count">Result found: {filteredTransactions.length}</div>
        </div>

        <div className="transaction-filters">
          <div className="filter-item">
            <label>Type</label>
            <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
              <option value="All">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Category</label>
            <select value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="filter-item">
            <label>Division</label>
            <select value={filters.division} onChange={e => setFilters({...filters, division: e.target.value})}>
              {divisions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="filter-item">
            <label>Start Date</label><br />
            <input type="date" value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} />
          </div>

          <div className="filter-item">
            <label>End Date</label><br />
            <input type="date" value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} />
          </div>

          <div className="filter-count">Filters Applied: {filterCount}</div>
        </div>
      </div>

      {/* Transaction History List */}
      {filteredTransactions.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No transactions found</p>
      ) : (
        <div className="transaction-history space-y-3 mt-4">
  {filteredTransactions.length === 0 ? (
    <p className="text-center text-gray-500">No transactions found</p>
  ) : (
    filteredTransactions.map((tx) => (
      <div style={{backgroundColor:`${tx.type === "income" ? "#a5fcb8" : "#f5acb8"}`}}
        key={tx._id}
        className="transaction-card flex justify-between items-center p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow"
      >
        {/* Left info */}
        <div className="transaction-info space-y-1" >

          <div className="text-sm text-gray-500">
          <div className="text-xs text-gray-500">
          <div
    >
      <strong>Amount</strong>: ₹{Math.round(tx.amount)} 
    </div>

    {/* Description */}
    <div className="text-sm text-gray-800 font-medium">
    <strong>Description : </strong> {tx.description || "No description"}
    </div>
      <span className="mr-2">
        <strong>Category :</strong> {tx.category}
      </span>
      <br />
      <span className="ml-2">
        <strong>Division :</strong> {tx.division}
      </span>
    </div>
          </div>
        </div>

        {/* Right date */}
        <div className="transaction-date text-sm text-gray-400" style={{color:"white"}}>
            <strong>({tx.type.toUpperCase()})</strong>
            <div>{new Date(tx.date).toLocaleDateString()}</div>
            <div>{new Date(tx.date).toLocaleTimeString()}</div>
        </div>
      </div>
    ))
  )}
</div>

      )}

      {/* Floating Add Button */}
      <button className="add-transaction-btn" onClick={() => setOpen(true)}>+</button>
      {open && (
  <AddTransactionModal
    onClose={() => setOpen(false)}
    onSave={() => {
      setOpen(false); // close modal
      loadDashboard(); // refresh dashboard after new transaction
    }}
  />
)}

    </div>
  );
}
