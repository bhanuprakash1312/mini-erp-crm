import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import { Plus, Edit2, Trash2, ArrowLeft, ArrowRight, Loader2, AlertTriangle, ShieldCheck } from "lucide-react";
import { getProducts, deleteProduct } from "../../services/product";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts(page, limit, search);
      setProducts(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.log(error);
      alert("Unable to delete product");
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 size={36} className="animate-spin text-brand-indigo mb-3" />
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Products</h1>
          <p className="text-sm text-slate-555">Monitor inventory stock levels, warehouse allocations, and unit pricing.</p>
        </div>
        <Button
          onClick={() => navigate("/products/add")}
          className="w-full sm:w-auto shadow-md"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Search Filter Strip */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <SearchBar
          value={search}
          placeholder="Search product, SKU, category..."
          onSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
        />
        {loading && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Loader2 size={12} className="animate-spin" />
            <span>Searching...</span>
          </div>
        )}
      </div>

      {/* Grid Table */}
      <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-6 py-3.5">Product Details</th>
              <th className="px-6 py-3.5">SKU Code</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Unit Price</th>
              <th className="px-6 py-3.5">Stock Level</th>
              <th className="px-6 py-3.5">Warehouse Location</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-slate-400 font-medium">
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isLowStock = product.currentStock <= product.minimumStock;
                return (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{product.productName}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{product.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                        {product.category || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-700 whitespace-nowrap">
                      ₹{product.unitPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold font-mono ${isLowStock ? "text-brand-rose" : "text-slate-800"}`}>
                          {product.currentStock}
                        </span>
                        <span className="text-xs text-slate-400">/ min {product.minimumStock}</span>
                        {isLowStock && (
                          <span
                            className="text-brand-rose flex items-center gap-0.5 text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 bg-red-50 rounded"
                            title="Below Safety Margin"
                          >
                            <AlertTriangle size={10} />
                            <span>Low</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap font-medium">{product.warehouse || "-"}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/products/edit/${product.id}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-750 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-brand-rose transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination wrapper */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 flex-wrap gap-4">
          <p className="text-xs font-semibold text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="py-1.5 px-3 text-xs"
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </Button>
            <Button
              variant="secondary"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
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

export default ProductList;