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
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import DateRangeFilter from "../components/DateRangeFilter";
import CategoryFilter from "../components/CategoryFilter";



const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [dateFilter, setDateFilter] = useState({});
const [categoryFilter, setCategoryFilter] = useState("");



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
    const monthlyRes = await fetchMonthlySummary(dateFilter);

    const categoryRes = await fetchCategorySummary({
      ...dateFilter,
      category: categoryFilter || undefined
    });

    setMonthlyData(transformMonthlyData(monthlyRes.data.summary));
    setCategoryData(transformCategoryData(categoryRes.data.summary));
  };

  loadAnalytics();
}, [dateFilter, categoryFilter]);



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
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <Card className="p-6 mb-6 flex items-center justify-between">
  <div>
    <h1 className="text-xl font-semibold text-slate-900">
      Dashboard
    </h1>
    <p className="text-sm text-slate-500">
      Welcome back, {user?.name}
    </p>
  </div>

  <Button
    variant="secondary"
    className="w-auto px-4"
    onClick={logout}
  >
    Logout
  </Button>
</Card>


      <Card className="p-6 mb-6">
  <TransactionForm
    onAdd={handleAdd}
    onUpdate={handleUpdate}
    editing={editing}
  />
</Card>


      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card className="p-6">
  <h2 className="text-lg font-semibold text-slate-900 mb-4">
    Recent Transactions
  </h2>

  <TransactionList
    transactions={transactions}
    onEdit={setEditing}
    onDelete={handleDelete}
  />
</Card>

      )}

      <Card className="p-4 flex flex-wrap gap-4 items-center">
  <DateRangeFilter
    onChange={(key, value) =>
      setDateFilter((prev) => ({ ...prev, [key]: value }))
    }
  />

  <CategoryFilter
    categories={[...new Set(transactions.map(t => t.category))]}
    onChange={setCategoryFilter}
  />
</Card>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  <Card className="p-6 h-96">
    <MonthlyBarChart data={monthlyData} />
  </Card>

  <Card className="p-6 h-96">
    <CategoryPieChart data={categoryData} />
  </Card>
</div>


    </div>
  );
};

export default Dashboard;
