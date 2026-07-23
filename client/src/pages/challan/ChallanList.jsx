import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { Plus, Eye, Loader2 } from "lucide-react";
import { getChallans } from "../../services/challan";

const ChallanList = () => {
  const navigate = useNavigate();

  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallans();
  }, []);

  const loadChallans = async () => {
    try {
      setLoading(true);
      const response = await getChallans();
      setChallans(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 size={36} className="animate-spin text-brand-indigo mb-3" />
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Challans...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Sales Challans</h1>
          <p className="text-sm text-slate-555">Review sales dispatch challans, status updates, and quantity totals.</p>
        </div>
        <Button
          onClick={() => navigate("/challans/create")}
          className="w-full sm:w-auto shadow-md"
        >
          <Plus size={16} />
          <span>Create Challan</span>
        </Button>
      </div>

      {/* Grid Table */}
      <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-6 py-3.5">Challan Number</th>
              <th className="px-6 py-3.5">Customer Name</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Total Quantity</th>
              <th className="px-6 py-3.5">Created By</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {challans.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-400 font-medium">
                  No Sales Challans Found
                </td>
              </tr>
            ) : (
              challans.map((challan) => (
                <tr key={challan.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{challan.challanNumber}</td>
                  <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">{challan.customer.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold tracking-wide uppercase ${
                      challan.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-700" :
                      challan.status === "CANCELLED" ? "bg-red-50 text-red-750" :
                      challan.status === "DELIVERED" ? "bg-blue-50 text-blue-700" :
                      "bg-amber-50 text-amber-700"
                    }`}>
                      {challan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-800 whitespace-nowrap">{challan.totalQuantity} units</td>
                  <td className="px-6 py-4 whitespace-nowrap">{challan.user.name}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/challans/${challan.id}`)}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-indigo/10 text-brand-indigo hover:bg-brand-indigo hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <Eye size={12} />
                      <span>View details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChallanList;