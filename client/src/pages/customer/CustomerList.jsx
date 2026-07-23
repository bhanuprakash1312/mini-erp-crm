import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import { Plus, Edit2, Trash2, ArrowLeft, ArrowRight, Loader2, Sparkles, ShieldAlert, ShieldCheck } from "lucide-react";
import { getCustomers, deleteCustomer } from "../../services/customer";

const CustomerList = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers(page, limit, search);
      setCustomers(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [page, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this customer?");
    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch (error) {
      console.log(error);
      alert("Unable to delete customer");
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 size={36} className="animate-spin text-brand-indigo mb-3" />
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Customers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Customers</h1>
          <p className="text-sm text-slate-555">Manage customer CRM leads, accounts, and contact points.</p>
        </div>
        <Button
          onClick={() => navigate("/customers/add")}
          className="w-full sm:w-auto shadow-md"
        >
          <Plus size={16} />
          <span>Add Customer</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <SearchBar
          value={search}
          placeholder="Search customer, business, type..."
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

      {/* Table grid wrapper */}
      <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-6 py-3.5">Name</th>
              <th className="px-6 py-3.5">Business</th>
              <th className="px-6 py-3.5">Email</th>
              <th className="px-6 py-3.5">Mobile</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-400 font-medium">
                  No Customers Found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{customer.customerName}</div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-0.5">{customer.customerType}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{customer.businessName || "-"}</td>
                  <td className="px-6 py-4 text-slate-500 select-all">{customer.email || "-"}</td>
                  <td className="px-6 py-4 font-mono text-slate-500">{customer.mobile || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold tracking-wide uppercase ${
                      customer.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" :
                      customer.status === "INACTIVE" ? "bg-red-50 text-red-750" :
                      "bg-brand-indigo/10 text-brand-indigo"
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/customers/edit/${customer.id}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-750 transition-colors cursor-pointer"
                        title="Edit Customer"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-brand-rose transition-colors cursor-pointer"
                        title="Delete Customer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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

export default CustomerList;