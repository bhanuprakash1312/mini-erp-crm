import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import { ArrowLeft, FileText, User, Calendar, ClipboardCheck, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { getChallanById, updateChallanStatus } from "../../services/challan";

const ChallanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [challan, setChallan] = useState(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadChallan();
  }, []);

  const loadChallan = async () => {
    try {
      setLoading(true);
      const response = await getChallanById(id);
      setChallan(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.log(error);
      alert("Unable to load challan");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      setUpdating(true);
      await updateChallanStatus(id, status);
      alert("Status Updated");
      loadChallan();
    } catch (error) {
      console.log(error);
      alert("Unable to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 size={36} className="animate-spin text-brand-indigo mb-3" />
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Challan Details...</p>
      </div>
    );
  }

  if (!challan) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Challan Not Found</h2>
        <Button onClick={() => navigate("/challans")} variant="secondary">
          Back to List
        </Button>
      </div>
    );
  }

  const inputStyle = "px-3.5 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all disabled:opacity-50 disabled:bg-slate-50";

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Back navigation */}
      <div>
        <button
          onClick={() => navigate("/challans")}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-550 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Challans</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileText size={20} className="text-brand-indigo" />
              <span>Challan Profile</span>
            </h2>
            <p className="text-xs text-slate-400">Detailed records, products listing, and workflow status for challan.</p>
          </div>
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase ${
              challan.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-700 border border-emerald-250" :
              challan.status === "CANCELLED" ? "bg-red-50 text-red-750 border border-red-200" :
              challan.status === "DELIVERED" ? "bg-blue-50 text-blue-700 border border-blue-200" :
              "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              {challan.status}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Challan Reference</span>
              <p className="text-sm font-bold text-slate-800 font-mono">{challan.challanNumber}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Customer Name</span>
              <p className="text-sm font-semibold text-slate-800">{challan.customer.customerName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Business Company</span>
              <p className="text-sm font-medium text-slate-700">{challan.customer.businessName || "-"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Generated By</span>
              <p className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                <User size={13} className="text-slate-450" />
                <span>{challan.user.name}</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Dispatch Qty</span>
              <p className="text-sm font-bold text-slate-800 font-mono">{challan.totalQuantity} units</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Created Timestamp</span>
              <p className="text-sm font-medium text-slate-700 flex items-center gap-1 font-mono text-xs">
                <Calendar size={13} className="text-slate-450" />
                <span>{new Date(challan.createdAt).toLocaleString()}</span>
              </p>
            </div>
          </div>

          {/* Products Table section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Dispatched Products</h3>
            <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-6 py-3">Product Description</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Unit Price (₹)</th>
                    <th className="px-6 py-3 text-right">Subtotal Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {challan.items.map((item) => {
                    const price = item.unitPrice || 0;
                    const qty = item.quantity || 0;
                    const subtotal = price * qty;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{item.productName}</td>
                        <td className="px-6 py-4 font-mono whitespace-nowrap">{qty} units</td>
                        <td className="px-6 py-4 font-mono whitespace-nowrap">₹{price.toLocaleString("en-IN")}</td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-800 text-right whitespace-nowrap">
                          ₹{subtotal.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Update panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <ClipboardCheck size={16} className="text-brand-indigo" />
                <span>Workflow Operations Status</span>
              </h4>
              <p className="text-xs text-slate-500">Update status levels as inventory moves through dispatch and courier routes.</p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`${inputStyle} w-full sm:w-44`}
                disabled={updating}
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              
              <Button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="w-full sm:w-auto shadow-sm whitespace-nowrap"
              >
                {updating ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={13} />}
                <span>Update Status</span>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChallanDetails;