import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { ArrowLeft, Plus, Trash2, FilePlus2, Loader2 } from "lucide-react";
import { getCustomers } from "../../services/customer";
import { getProducts } from "../../services/product";
import { createChallan } from "../../services/challan";

const CreateChallan = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getCustomers(1, 100, "");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getProducts(1, 100, "");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
      },
    ]);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];

    updated[index][field] =
      field === "quantity" || field === "productId"
        ? Number(value)
        : value;

    setItems(updated);
  };

  const totalQuantity = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerId) {
      alert("Select a customer");
      return;
    }

    if (
      items.some(
        (item) => !item.productId || item.quantity <= 0
      )
    ) {
      alert("Complete all product details");
      return;
    }

    try {
      setLoading(true);

      await createChallan({
        customerId: Number(customerId),
        items,
      });

      alert("Challan Created Successfully");
      navigate("/challans");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Unable to create challan");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all disabled:opacity-50 disabled:bg-slate-50";

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
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
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FilePlus2 size={20} className="text-brand-indigo" />
            <span>Generate Sales Challan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Select a customer account and add products with quantities to dispatch stock.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Customer Selection */}
          <div className="space-y-1.5 max-w-md">
            <label className="text-sm font-semibold text-slate-700">Customer Account *</label>
            <select
              required
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className={inputStyle}
              disabled={loading}
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.customerName} ({customer.businessName || "No Company"})
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-slate-150 pt-5">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Item Details</h3>
            
            {/* Products Rows Grid */}
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-end sm:items-center gap-3 bg-slate-50/50 p-4 border border-slate-200 rounded-xl">
                  {/* Select Product */}
                  <div className="flex-1 space-y-1 w-full">
                    <label className="text-xs font-semibold text-slate-500 block sm:hidden">Product Name</label>
                    <select
                      required
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                      className={inputStyle}
                      disabled={loading}
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.productName} (Avail: {product.currentStock} units)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity Input */}
                  <div className="w-full sm:w-28 space-y-1">
                    <label className="text-xs font-semibold text-slate-500 block sm:hidden">Quantity</label>
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      className={inputStyle}
                      disabled={loading}
                    />
                  </div>

                  {/* Remove Button */}
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 rounded-lg text-slate-400 hover:text-brand-rose hover:bg-red-50 transition-colors w-full sm:w-auto flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold cursor-pointer border border-transparent sm:border-none"
                      disabled={loading}
                    >
                      <Trash2 size={16} />
                      <span className="sm:hidden">Remove Item</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Product Button */}
            <div className="mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={addItem}
                disabled={loading}
                className="py-1.5 px-3 text-xs"
              >
                <Plus size={14} />
                <span>Add Product Row</span>
              </Button>
            </div>
          </div>

          {/* Quantity and Submit Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-150">
            <div className="bg-slate-100/50 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700">
              Total Quantity Summary: <span className="font-mono text-brand-indigo font-bold">{totalQuantity}</span> units
            </div>

            <div className="flex items-center gap-3 justify-end w-full sm:w-auto">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/challans")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <FilePlus2 size={15} />}
                <span>Create Challan</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallan;