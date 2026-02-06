import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";
import dayjs from "dayjs";

export default function History() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  const canEdit = (createdAt) => dayjs().diff(dayjs(createdAt), "hour") <= 12;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Type</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Division</th>
      <th>Account</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {transactions.map(t => (
      <tr key={t.id}>
        <td>{new Date(t.date).toLocaleString()}</td>
        <td>{t.type}</td>
        <td>{t.amount}</td>
        <td>{t.category}</td>
        <td>{t.division}</td>
        <td>{t.account}</td>
        <td>{t.description}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
