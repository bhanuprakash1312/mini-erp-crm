import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { ArrowLeft, ArrowDownLeft, Loader2, Save } from "lucide-react";
import { stockIn } from "../../services/inventory";
import { getProducts } from "../../services/product";

const StockIn = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    reason: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts(1, 100, "");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "quantity" ||
        e.target.name === "productId"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await stockIn(formData);
      alert("Stock Added Successfully");
      navigate("/inventory/history");
    } catch (error) {
      console.log(error);
      alert("Unable to add stock");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all disabled:opacity-50 disabled:bg-slate-50";

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-300">
      <div>
        <button
          onClick={() => navigate("/inventory/history")}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-550 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to History</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ArrowDownLeft size={20} className="text-brand-emerald" />
            <span>Stock In Operation</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manually adjust inventory upward (e.g. restock, inbound shipment, correction).</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Product Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650">Select Product *</label>
            <select
              required
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className={inputStyle}
              disabled={loading}
            >
              <option value="">Choose a Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.productName} (Current: {product.currentStock})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-655">Inbound Quantity *</label>
            <input
              required
              type="number"
              min="1"
              name="quantity"
              placeholder="Quantity to add"
              value={formData.quantity}
              onChange={handleChange}
              className={inputStyle}
              disabled={loading}
            />
          </div>

          {/* Reason */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650">Reason for Stock In *</label>
            <input
              required
              name="reason"
              placeholder="e.g. Purchase Restock, Return Correction"
              value={formData.reason}
              onChange={handleChange}
              className={inputStyle}
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/inventory/history")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>Add Stock</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockIn;