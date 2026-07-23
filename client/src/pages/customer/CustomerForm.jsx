import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../services/customer";

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

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>

      <h2>{isEdit ? "Edit Customer" : "Add Customer"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="gstNumber"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="customerType"
          placeholder="Customer Type"
          value={formData.customerType}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="date"
          name="followUpDate"
          value={formData.followUpDate}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          {isEdit ? "Update Customer" : "Create Customer"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/customers")}
        >
          Cancel
        </button>

      </form>

    </div>
  );
};

export default CustomerForm;