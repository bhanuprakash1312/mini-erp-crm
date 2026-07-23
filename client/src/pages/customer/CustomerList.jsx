import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/common/SearchBar";

import {
  getCustomers,
  deleteCustomer,
} from "../../services/customer";

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

  if (initialLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h2>Customers</h2>

      <br />

      <SearchBar
        value={search}
        placeholder="Search Customer..."
        onSearch={(value) => {
          setPage(1);
          setSearch(value);
        }}
      />

      <button
        onClick={() => navigate("/customers/add")}
      >
        Add Customer
      </button>

      <br />
      <br />

      {loading && (
        <p style={{ color: "gray" }}>
          Searching...
        </p>
      )}

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

          {customers.length === 0 ? (

            <tr>
              <td colSpan="6">
                No Customers Found
              </td>
            </tr>

          ) : (

            customers.map((customer) => (

              <tr key={customer.id}>

                <td>{customer.customerName}</td>

                <td>{customer.businessName}</td>

                <td>{customer.email}</td>

                <td>{customer.mobile}</td>

                <td>{customer.status}</td>

                <td>

                  <button
                    onClick={() =>
                      navigate(
                        `/customers/edit/${customer.id}`
                      )
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

            ))

          )}

        </tbody>

      </table>

      <br />

      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        Previous
      </button>

      <span>
        {" "}
        Page {page} of {totalPages}{" "}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>

    </div>
  );
};

export default CustomerList;