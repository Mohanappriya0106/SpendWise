const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (!transactions.length) {
    return <p className="text-gray-500 text-sm">No transactions yet.</p>;
  }

  return (
    <div className="bg-white rounded shadow">
      <ul>
        {transactions.map((t) => (
          <li
            key={t._id}
            className="flex justify-between items-center border-b p-3"
          >
            <div>
              <p className="font-medium">{t.category}</p>
              <p className="text-sm text-gray-500">
                {new Date(t.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  t.type === "expense"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {t.type === "expense" ? "-" : "+"}₹{t.amount}
              </span>

              <button
                onClick={() => onEdit(t)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(t._id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;

