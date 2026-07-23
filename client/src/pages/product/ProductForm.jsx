import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { createProduct, getProductById, updateProduct } from "../../services/product";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    category: "",
    unitPrice: "",
    currentStock: "",
    minimumStock: "",
    warehouse: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await getProductById(id);

      setFormData({
        productName: response.data.productName || "",
        sku: response.data.sku || "",
        category: response.data.category || "",
        unitPrice: response.data.unitPrice || "",
        currentStock: response.data.currentStock || "",
        minimumStock: response.data.minimumStock || "",
        warehouse: response.data.warehouse || "",
      });
    } catch (error) {
      console.log(error);
      alert("Unable to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateProduct(id, formData);
        alert("Product updated successfully");
      } else {
        await createProduct(formData);
        alert("Product created successfully");
      }

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 size={36} className="animate-spin text-brand-indigo mb-3" />
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Product Details...</p>
      </div>
    );
  }

  const inputStyle = "w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all disabled:opacity-50 disabled:bg-slate-50";

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-550 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">{isEdit ? "Edit Product Details" : "Add New Product"}</h2>
          <p className="text-xs text-slate-400 mt-1">Configure SKU identification, unit pricing, warehouses, and warning thresholds.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Product Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-650">Product Name *</label>
              <input
                required
                name="productName"
                placeholder="Product Name"
                value={formData.productName}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* SKU */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">SKU / Code *</label>
              <input
                required
                name="sku"
                placeholder="e.g. ELEC-HEAD-001"
                value={formData.sku}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Category</label>
              <input
                name="category"
                placeholder="e.g. Electronics, Fashion"
                value={formData.category}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Unit Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-655">Unit Price (₹) *</label>
              <input
                required
                type="number"
                min="0"
                name="unitPrice"
                placeholder="0.00"
                value={formData.unitPrice}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Current Stock */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-655">Current Stock *</label>
              <input
                required
                type="number"
                min="0"
                name="currentStock"
                placeholder="Initial Stock Quantity"
                value={formData.currentStock}
                onChange={handleChange}
                className={inputStyle}
                disabled={isEdit} // Block currentStock modification on Edit (inventory should be managed via Stock In/Out operations)
              />
            </div>

            {/* Minimum Stock Alert */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Minimum Stock Alert Qty *</label>
              <input
                required
                type="number"
                min="0"
                name="minimumStock"
                placeholder="Trigger warning below this qty"
                value={formData.minimumStock}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Warehouse */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Warehouse / Location</label>
              <input
                name="warehouse"
                placeholder="e.g. Floor 2, Row B"
                value={formData.warehouse}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          {/* Actions wrapper */}
          <div className="flex items-center gap-3 justify-end pt-5 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/products")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              <Save size={15} />
              <span>{isEdit ? "Update Product" : "Save Product"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;