import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

const Header = ({ onMenuClick }) => {
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md hover:bg-slate-100"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Logo */}
        <div
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="text-indigo-600">Spend</span>
          <span className="text-slate-900">Wise</span>
        </div>
      </div>

      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
    </header>
  );
};


export default Header;
