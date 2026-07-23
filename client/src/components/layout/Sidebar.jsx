import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Package, ArrowUpRight, ArrowDownLeft, AlertTriangle, History, FileText, X } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/customers", label: "Customers", icon: Users },
    { to: "/products", label: "Products", icon: Package },
    { to: "/inventory/stock-in", label: "Stock In", icon: ArrowDownLeft },
    { to: "/inventory/stock-out", label: "Stock Out", icon: ArrowUpRight },
    { to: "/inventory/low-stock", label: "Low Stock Alerts", icon: AlertTriangle },
    { to: "/inventory/history", label: "Inventory History", icon: History },
    { to: "/challans", label: "Sales Challans", icon: FileText },
  ];

  const activeClass = "flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg bg-brand-indigo/10 text-brand-indigo transition-all";
  const inactiveClass = "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed lg:static top-0 bottom-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-indigo flex items-center justify-center text-white font-bold text-base shadow-sm">
              E
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">Mini ERP CRM</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;