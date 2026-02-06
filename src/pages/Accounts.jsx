export default function Accounts({ transactions }) {
    const accounts = [...new Set(transactions.map(t=>t.account))];
  
    return (
      <div className="container">
        {accounts.map(acc=>(
          <div className="card mb-3" key={acc}>
            <h3>{acc}</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th><th>Type</th><th>Amount</th><th>Category</th><th>Division</th><th>Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.filter(t=>t.account===acc).map(t=>(
                  <tr key={t.id}>
                    <td>{new Date(t.date).toLocaleString()}</td>
                    <td>{t.type}</td>
                    <td>{t.amount}</td>
                    <td>{t.category}</td>
                    <td>{t.division}</td>
                    <td>{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    )
  }
  