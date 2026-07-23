import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { createCustomer, getCustomerById, updateCustomer } from "../../services/customer";

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    businessName: "",
    email: "",
    mobile: "",
    gstNumber: "",
    customerType: "",
    address: "",
    status: "",
    followUpDate: "",
    notes: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchCustomer();
    }
  }, []);

  const fetchCustomer = async () => {
    try {
      setLoading(true);

      const response = await getCustomerById(id);

      setFormData({
        customerName: response.data.customerName || "",
        businessName: response.data.businessName || "",
        email: response.data.email || "",
        mobile: response.data.mobile || "",
        gstNumber: response.data.gstNumber || "",
        customerType: response.data.customerType || "",
        address: response.data.address || "",
        status: response.data.status || "",
        followUpDate: response.data.followUpDate
          ? response.data.followUpDate.split("T")[0]
          : "",
        notes: response.data.notes || "",
      });

    } catch (error) {
      console.log(error);
      alert("Unable to fetch customer");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateCustomer(id, formData);
        alert("Customer updated successfully");
      } else {
        await createCustomer(formData);
        alert("Customer created successfully");
      }

      navigate("/customers");

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 size={36} className="animate-spin text-brand-indigo mb-3" />
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Loading Customer Details...</p>
      </div>
    );
  }

  const inputStyle = "w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all disabled:opacity-50 disabled:bg-slate-50";

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate("/customers")}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-550 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Customers</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">{isEdit ? "Edit Customer Profile" : "Add New Customer"}</h2>
          <p className="text-xs text-slate-400 mt-1">Provide contact details, business entity information, and CRM parameters.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Customer Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Customer Name *</label>
              <input
                required
                name="customerName"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Business Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Business Name</label>
              <input
                name="businessName"
                placeholder="Company/Trade Name"
                value={formData.businessName}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-655">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Mobile */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-655">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="e.g. +91 99999 99999"
                value={formData.mobile}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* GST Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">GST Number</label>
              <input
                name="gstNumber"
                placeholder="e.g. 29AAAAA0000A1Z5"
                value={formData.gstNumber}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Customer Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Customer Type *</label>
              <select
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
                required
                className={inputStyle}
              >
                <option value="">Select Type</option>
                <option value="RETAIL">Retail</option>
                <option value="WHOLESALE">Wholesale</option>
                <option value="DISTRIBUTOR">Distributor</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className={inputStyle}
              >
                <option value="">Select Status</option>
                <option value="LEAD">Lead</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            {/* Follow-up Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-650">Follow-up Date</label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Address */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-650">Billing / Delivery Address</label>
              <textarea
                name="address"
                placeholder="Full street address, city, state, postal code"
                value={formData.address}
                onChange={handleChange}
                className={`${inputStyle} min-h-[80px] resize-y`}
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-650">Notes / CRM Follow-up Log</label>
              <textarea
                name="notes"
                placeholder="Internal team notes regarding follow-ups, preferences, or payment history..."
                value={formData.notes}
                onChange={handleChange}
                className={`${inputStyle} min-h-[80px] resize-y`}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 justify-end pt-5 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/customers")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              <Save size={15} />
              <span>{isEdit ? "Update Profile" : "Save Profile"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;