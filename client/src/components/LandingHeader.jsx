import { Link } from "react-router-dom";
import Button from "./ui/Button";

const LandingHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl sm:text-3xl font-bold tracking-tight shrink-0"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="text-indigo-600">Spend</span>
          <span className="text-slate-900">Wise</span>
        </div>

        {/* Auth actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login">
            <Button variant="secondary" className="w-auto px-4">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button className="w-auto px-4">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;


