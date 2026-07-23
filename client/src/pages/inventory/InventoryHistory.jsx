import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { ArrowLeft, ArrowRight, ArrowDownLeft, ArrowUpRight, Plus, Minus, Loader2 } from "lucide-react";
import { getInventoryHistory } from "../../services/inventory";

const InventoryHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const loadHistory = async () => {
    try {
      setLoading(true);
      const response = await getInventoryHistory(page, limit);
      setHistory(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [page]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 size={36} className="animate-spin text-brand-indigo mb-3" />
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Inventory Logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Inventory History</h1>
          <p className="text-sm text-slate-555">Review inbound/outbound adjustments and stock level revisions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate("/inventory/stock-in")}
            className="shadow-sm"
          >
            <Plus size={15} />
            <span>Stock In</span>
          </Button>
          <Button
            variant="danger"
            onClick={() => navigate("/inventory/stock-out")}
            className="shadow-sm !bg-brand-rose hover:!bg-red-750"
          >
            <Minus size={15} />
            <span>Stock Out</span>
          </Button>
        </div>
      </div>

      {/* Grid Table */}
      <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-6 py-3.5">Product Name</th>
              <th className="px-6 py-3.5">Movement Type</th>
              <th className="px-6 py-3.5">Adjusted Qty</th>
              <th className="px-6 py-3.5">Reason</th>
              <th className="px-6 py-3.5">Operator</th>
              <th className="px-6 py-3.5">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {history.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-400 font-medium">
                  No Inventory History Found
                </td>
              </tr>
            ) : (
              history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{item.product.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold tracking-wide uppercase ${
                      item.movementType === "IN" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-750"
                    }`}>
                      {item.movementType === "IN" ? <ArrowDownLeft size={11} /> : <ArrowUpRight size={11} />}
                      <span>{item.movementType === "IN" ? "Stock In" : "Stock Out"}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {item.movementType === "IN" ? "+" : "-"}{item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-550">{item.reason || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.user?.name || "System"}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-450">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination component */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 flex-wrap gap-4">
          <p className="text-xs font-semibold text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="py-1.5 px-3 text-xs"
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </Button>
            <Button
              variant="secondary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="py-1.5 px-3 text-xs"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryHistory;