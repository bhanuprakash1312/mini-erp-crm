import useAuth from "../../hooks/useAuth";
import { Menu, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuToggle }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white/85 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-150 hover:text-slate-700 lg:hidden focus:outline-none cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <span className="text-lg font-bold text-slate-800 tracking-tight lg:hidden">ERP CRM</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-650">
          <div className="w-8 h-8 rounded-full bg-brand-indigo/10 flex items-center justify-center text-brand-indigo font-bold uppercase">
            {user?.name ? user.name.charAt(0) : <User size={16} />}
          </div>
          <span className="hidden sm:inline font-semibold text-slate-700">
            {user?.name || "User"}
          </span>
          <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-wider">
            {user?.role || "Staff"}
          </span>
        </div>
        
        <button
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-brand-rose rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;