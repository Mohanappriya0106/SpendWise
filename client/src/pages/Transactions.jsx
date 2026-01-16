import { useEffect, useMemo, useState } from "react";
import {
  fetchTransactions,
  deleteTransaction
} from "../api/transactions";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";
import Card from "../components/ui/Card";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
  from: "",
  to: ""
});
const [typeFilter, setTypeFilter] = useState("all");


  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchTransactions();
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Failed to load transactions", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

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
  const filteredTransactions = useMemo(() => {
  return transactions.filter((t) => {
    // Type filter
    if (typeFilter !== "all" && t.type !== typeFilter) {
      return false;
    }

    // Date filter
    const txDate = new Date(t.date);
    if (dateRange.from && txDate < new Date(dateRange.from)) {
      return false;
    }
    if (dateRange.to && txDate > new Date(dateRange.to)) {
      return false;
    }

    return true;
  });
}, [transactions, dateRange, typeFilter]);

  return (
    <div className="space-y-6">
      {editing && (
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Edit Transaction</h2>
          <TransactionForm
            editing={editing}
            onUpdate={handleUpdate}
          />
        </Card>
      )}

      <Card className="p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-4">
          Transaction History
        </h1>
        <div className="flex flex-wrap gap-4 mb-6">
  {/* Date range */}
  <div className="flex items-center gap-2">
    <input
      type="date"
      className="border rounded-md px-2 py-1 text-sm"
      value={dateRange.from}
      onChange={(e) =>
        setDateRange((p) => ({ ...p, from: e.target.value }))
      }
    />
    <span className="text-slate-400 text-sm">to</span>
    <input
      type="date"
      className="border rounded-md px-2 py-1 text-sm"
      value={dateRange.to}
      onChange={(e) =>
        setDateRange((p) => ({ ...p, to: e.target.value }))
      }
    />
  </div>

  {/* Type filter */}
  <select
    className="border rounded-md px-3 py-1.5 text-sm"
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
  >
    <option value="all">All</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
  </select>
</div>


        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-slate-500">
            No transactions yet.
          </p>
        ) : (
          <TransactionList
  transactions={filteredTransactions}
  onEdit={setEditing}
  onDelete={handleDelete}
/>

        )}
      </Card>
    </div>
  );
};

export default Transactions;
