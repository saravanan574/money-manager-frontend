import { useState } from "react";
import Header from "./pages/Header";
import AddTransactionModal from "./components/transactions/AddTransactionModal";
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Summary";
import Accounts from "./pages/Accounts";
import "./styles/global.css";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [modalOpen, setModalOpen] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const handleSaveTransaction = (t) => {
    t.id = Date.now();
    setTransactions([...transactions, t]);
  };

  const renderPage = () => {
    if(activePage==="Dashboard") return <Dashboard transactions={transactions} />;
    if(activePage==="Summary") return <Summary transactions={transactions} />;
    if(activePage==="Accounts") return <Accounts transactions={transactions} />;
  }

  return (
    <>
      <Header activePage={activePage} setActivePage={setActivePage} onAdd={()=>setModalOpen(true)} />
      {renderPage()}
      {modalOpen && <AddTransactionModal onClose={()=>setModalOpen(false)} onSave={handleSaveTransaction} />}
    </>
  )
}
