export default function Summary({ transactions }) {
    const categories = [...new Set(transactions.map(t=>t.category))];
    
    return (
      <div className="container flex flex-wrap gap-20">
        {categories.map(c=>{
          const total = transactions.filter(t=>t.category===c).reduce((a,b)=>a+b.amount,0);
          return (
            <div className="card" key={c}>
              <h3>{c}</h3>
              <p>Total: {total}</p>
            </div>
          )
        })}
      </div>
    )
  }
  