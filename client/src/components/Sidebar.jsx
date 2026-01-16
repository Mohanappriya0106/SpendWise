import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Home" },
  { path: "/transactions/new", label: "Add Transaction" },
  { path: "/transactions", label: "All Transactions" },
  { path: "/summary", label: "Summary" },
];

const Sidebar = ({ onClose }) => {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onClose && onClose()}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
