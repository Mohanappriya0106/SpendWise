import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchTransactions,
  deleteTransaction
} from "../api/transactions";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import {
  fetchMonthlySummary,
  fetchCategorySummary
} from "../api/analytics";
import {
  transformMonthlyData,
  transformCategoryData
} from "../utils/chartTransform";
import MonthlyBarChart from "../components/MonthlyBarChart";
import CategoryPieChart from "../components/CategoryPieChart";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);


  useEffect(() => {
    const loadTransactions = async () => {
      const res = await fetchTransactions();
      setTransactions(res.data.transactions);
      setLoading(false);
    };

    loadTransactions();
  }, []);
  useEffect(() => {
  const loadAnalytics = async () => {
    const [monthlyRes, categoryRes] = await Promise.all([
      fetchMonthlySummary(),
      fetchCategorySummary()
    ]);

    setMonthlyData(
      transformMonthlyData(monthlyRes.data.summary)
    );
    setCategoryData(
      transformCategoryData(categoryRes.data.summary)
    );
  };

  loadAnalytics();
}, []);


  const handleAdd = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const handleUpdate = (updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <TransactionForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editing={editing}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransactionList
          transactions={transactions}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <MonthlyBarChart data={monthlyData} />
            <CategoryPieChart data={categoryData} />
      </div>

    </div>
  );
};

export default Dashboard;
