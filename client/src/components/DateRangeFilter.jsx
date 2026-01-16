const DateRangeFilter = ({ onChange }) => {
  return (
    <div className="flex gap-3">
      <input
        type="date"
        className="border rounded-lg px-3 py-2 text-sm"
        onChange={(e) => onChange("startDate", e.target.value)}
      />
      <input
        type="date"
        className="border rounded-lg px-3 py-2 text-sm"
        onChange={(e) => onChange("endDate", e.target.value)}
      />
    </div>
  );
};

export default DateRangeFilter;
