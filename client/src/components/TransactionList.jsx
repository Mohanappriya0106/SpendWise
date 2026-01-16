const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (!transactions.length) {
    return (
      <p className="text-gray-500 text-sm">
        No transactions yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <ul>
        {transactions.map((t) => (
          <li
            key={t._id}
            className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 flex items-center justify-between mb-1"
          >
            {/* Left: Details */}
            <div>
              <p className="font-medium text-slate-900 capitalize">
                {t.category}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(t.date).toLocaleDateString()}
              </p>
            </div>

            {/* Right: Amount + Actions */}
            <div className="text-right">
              <p
                className={`font-semibold ${
                  t.type === "expense"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {t.type === "expense" ? "-" : "+"}₹{t.amount}
              </p>

              <div className="flex justify-end gap-4 mt-1 text-sm">
                <button
                  onClick={() => onEdit(t)}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(t._id)}
                  className="text-rose-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;


