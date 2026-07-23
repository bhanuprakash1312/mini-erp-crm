import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, ShieldAlert } from "lucide-react";
import { getLowStock } from "../../services/inventory";

const LowStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getLowStock();
      setProducts(response.data);
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
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Low Stock Items...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Low Stock Alerts</h1>
        <p className="text-sm text-slate-555 font-medium mt-1">Review catalog items whose current quantities have fallen below minimum thresholds.</p>
      </div>

      {/* Alert Banner */}
      {products.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-sm font-bold text-amber-800">Critical Actions Required</h4>
            <p className="text-xs text-amber-750 mt-1">
              There are {products.length} products triggering low-stock alerts. Please initiate restock requests or manual inbound adjustments.
            </p>
          </div>
        </div>
      )}

      {/* Grid Table */}
      <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-6 py-3.5">Product Name</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Current Stock</th>
              <th className="px-6 py-3.5">Minimum Stock Alert</th>
              <th className="px-6 py-3.5">Warehouse Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">
                  All products are adequately stocked. No warnings.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{product.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-650 rounded text-xs font-medium">
                      {product.category || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold font-mono text-brand-rose bg-red-50 px-2 py-0.5 rounded">
                      {product.currentStock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500 whitespace-nowrap">{product.minimumStock} units</td>
                  <td className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">{product.warehouse || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStock;