import { Link } from "react-router-dom";
import Button from "./ui/Button";

const LandingHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-44 m:px-6 flex items-center justify-between">
      {/* Logo */}
      <div
        className="text-3xl font-bold tracking-tight"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <span className="text-indigo-600">Spend</span>
        <span className="text-slate-900">Wise</span>
      </div>

      {/* Auth actions */}
      <div className="flex items-center gap-3">
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
    </header>
  );
};

export default LandingHeader;

