import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard";
import { Users, Package, FileText, AlertTriangle, TrendingDown, ArrowRightLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-brand-indigo mb-4"></div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Dashboard...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Customers",
      value: dashboard.summary.totalCustomers,
      icon: Users,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      desc: "Registered client accounts"
    },
    {
      title: "Total Products",
      value: dashboard.summary.totalProducts,
      icon: Package,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      desc: "Unique items in catalog"
    },
    {
      title: "Total Challans",
      value: dashboard.summary.totalChallans,
      icon: FileText,
      color: "bg-violet-50 text-violet-600 border-violet-100",
      desc: "Sales challans generated"
    },
    {
      title: "Low Stock Products",
      value: dashboard.summary.lowStockProducts,
      icon: AlertTriangle,
      color: dashboard.summary.lowStockProducts > 0 ? "bg-amber-50 text-amber-600 border-amber-100 animate-pulse" : "bg-slate-50 text-slate-500 border-slate-100",
      desc: "Items below safety threshold"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time summary of warehouse stock, client relationships, and sales dispatch.</p>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`p-6 bg-white border rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md ${card.color.split(" ").slice(2).join(" ")}`}
            >
              <div className={`p-3 rounded-lg flex-shrink-0 ${card.color.split(" ").slice(0, 2).join(" ")}`}>
                <Icon size={22} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</p>
                <p className="text-3xl font-bold text-slate-800">{card.value}</p>
                <p className="text-[11px] text-slate-500">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Challans Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-brand-indigo" />
              <span>Recent Sales Challans</span>
            </h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Number</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {dashboard.recentChallans.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-medium">No recent challans</td>
                  </tr>
                ) : (
                  dashboard.recentChallans.map((challan) => (
                    <tr key={challan.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-slate-800 whitespace-nowrap">{challan.challanNumber}</td>
                      <td className="px-6 py-3.5 whitespace-nowrap">{challan.customer.customerName}</td>
                      <td className="px-6 py-3.5 font-mono whitespace-nowrap">{challan.totalQuantity}</td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase ${
                          challan.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-700" :
                          challan.status === "CANCELLED" ? "bg-red-50 text-red-750" :
                          challan.status === "DELIVERED" ? "bg-blue-50 text-blue-700" :
                          "bg-amber-50 text-amber-700"
                        }`}>
                          {challan.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Inventory Operations Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <ArrowRightLeft size={18} className="text-brand-emerald" />
              <span>Recent Inventory Movements</span>
            </h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Movement</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {dashboard.recentInventory.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-medium">No inventory movements</td>
                  </tr>
                ) : (
                  dashboard.recentInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3.5 whitespace-nowrap font-medium text-slate-750">{item.product.productName}</td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase ${
                          item.movementType === "IN" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-750"
                        }`}>
                          {item.movementType === "IN" ? <ArrowDownLeft size={11} /> : <ArrowUpRight size={11} />}
                          {item.movementType}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-mono whitespace-nowrap">{item.quantity}</td>
                      <td className="px-6 py-3.5 whitespace-nowrap truncate max-w-[150px]">{item.reason || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;