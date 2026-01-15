import { useEffect, useState } from "react";
import {
  createTransaction,
  updateTransaction
} from "../api/transactions";

const TransactionForm = ({ onAdd, onUpdate, editing }) => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setType(editing.type);
      setAmount(editing.amount);
      setCategory(editing.category);
      setDate(editing.date.split("T")[0]);
      setNote(editing.note || "");
    }
  }, [editing]);

  const resetForm = () => {
    setType("expense");
    setAmount("");
    setCategory("");
    setDate("");
    setNote("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        type,
        amount: Number(amount),
        category,
        date,
        note
      };

      if (editing) {
        const res = await updateTransaction(editing._id, payload);
        onUpdate(res.data.transaction);
      } else {
        const res = await createTransaction(payload);
        onAdd(res.data.transaction);
      }

      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-6" onSubmit={handleSubmit}>
      <h3 className="font-semibold mb-3">
        {editing ? "Edit Transaction" : "Add Transaction"}
      </h3>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="grid grid-cols-2 gap-3 mb-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <input
        type="text"
        className="border p-2 rounded w-full mb-3"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="date"
        className="border p-2 rounded w-full mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        className="border p-2 rounded w-full mb-3"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TransactionForm;

