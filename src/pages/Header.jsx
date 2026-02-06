export default function Header({ activePage, setActivePage, onAdd }) {
    return (
      <div className="header">
        <div className="logo">Money Manager</div>
        <div className="nav">
          {["Dashboard","Summary","Accounts"].map(p => (
            <button 
              key={p} 
              className={activePage===p?"active":""} 
              onClick={()=>setActivePage(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <button className="add-btn" onClick={onAdd}>+ Add Transaction</button>
      </div>
    )
  }
  