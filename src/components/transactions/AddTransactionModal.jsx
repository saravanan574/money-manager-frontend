import { useState } from "react";
import Modal from "../common/Modal";
import Tabs from "../common/Tabs";
import TransactionForm from "./TransactionForm";
import { addTransaction } from "../../services/api";
export default function AddTransactionModal({ onClose, onSave }) {
  const [activeTab, setActiveTab] = useState("Income");

  const handleSave = async(formData) => {
      await addTransaction(formData); 
      onClose(); 
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-center">Add Transaction</h2>

      <Tabs
        tabs={["Income", "Expense"]}
        active={activeTab}
        onChange={setActiveTab}
      />

      <TransactionForm
        type={activeTab.toLowerCase()}
        onClose={onClose}
        onSave={handleSave} // ✅ Pass the callback
      />
    </Modal>
  );
}
