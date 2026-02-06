const BASE_URL = "http://localhost:5000/api";

/* ---------------- TRANSACTIONS ---------------- */

export const getTransactions = async () => {
  const res = await fetch(`${BASE_URL}/transactions`);
  return res.json();
};

export const addTransaction = async (data) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const dat = res.json();
  return dat;
};

export const updateTransaction = async (id, data) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

/* ---------------- DASHBOARD ---------------- */

export const getDashboardData = async (period) => {
  const res = await fetch(
    `${BASE_URL}/dashboard?period=${period}`
  );
  return res.json();
};

/* ---------------- CATEGORY SUMMARY ---------------- */

export const getCategorySummary = async (from, to, division) => {
  const url = new URL(`${BASE_URL}/dashboard/category-summary`);
  url.searchParams.append("from", from);
  url.searchParams.append("to", to);
  if (division) url.searchParams.append("division", division);

  const res = await fetch(url);
  return res.json();
};

/* ---------------- ACCOUNTS ---------------- */

export const getAccounts = async () => {
  const res = await fetch(`${BASE_URL}/accounts`);
  return res.json();
};

export const createAccount = async (data) => {
  const res = await fetch(`${BASE_URL}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
