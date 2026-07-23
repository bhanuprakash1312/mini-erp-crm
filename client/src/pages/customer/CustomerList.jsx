import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCustomers,
  deleteCustomer,
} from "../services/customer";

const CustomerList = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [page, search]);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this customer?"
    );

    if (!confirmDelete) return;

    try {

      await deleteCustomer(id);

      loadCustomers();

    } catch (error) {

      console.log(error);

      alert("Unable to delete customer");

    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h2>Customers</h2>

      <br />

      <input
        type="text"
        placeholder="Search customer"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <button
        onClick={() => navigate("/customers/add")}
      >
        Add Customer
      </button>

      <br />
      <br />

      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>Name</th>

            <th>Business</th>

            <th>Email</th>

            <th>Mobile</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr key={customer.id}>

              <td>{customer.customerName}</td>

              <td>{customer.businessName}</td>

              <td>{customer.email}</td>

              <td>{customer.mobile}</td>

              <td>{customer.status}</td>

              <td>

                <button
                  onClick={() =>
                    navigate(`/customers/edit/${customer.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(customer.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <br />

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <span>
        {" "}
        Page {page} of {totalPages}{" "}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>

    </div>
  );
};

export default CustomerList;