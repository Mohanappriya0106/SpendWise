const CategoryFilter = ({ categories, onChange }) => {
  return (
    <select
      className="border rounded-lg px-3 py-2 text-sm"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
