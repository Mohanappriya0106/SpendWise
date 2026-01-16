const KpiCard = ({ label, value, accent = "indigo" }) => {
  const colors = {
    green: "text-emerald-600",
    red: "text-rose-600",
    indigo: "text-indigo-600"
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${colors[accent]}`}>
        ₹{value.toLocaleString()}
      </p>
    </div>
  );
};

export default KpiCard;
