import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

      alert(
        error?.response?.data?.message ||
          "Unable to create challan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h2>Create Challan</h2>

      <form onSubmit={handleSubmit}>

        <div>

          <label>Customer</label>

          <br />

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.customerName}
              </option>
            ))}

          </select>

        </div>

        <br />

        <hr />

        <h3>Products</h3>

        {items.map((item, index) => (

          <div key={index}>

            <select
              value={item.productId}
              onChange={(e) =>
                handleItemChange(
                  index,
                  "productId",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.productName}
                </option>
              ))}

            </select>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(
                  index,
                  "quantity",
                  e.target.value
                )
              }
            />

            {items.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  removeItem(index)
                }
              >
                Remove
              </button>
            )}

            <br />
            <br />

          </div>

        ))}

        <button
          type="button"
          onClick={addItem}
        >
          Add Product
        </button>

        <br />
        <br />

        <h3>Total Quantity : {totalQuantity}</h3>

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Challan"}
        </button>

      </form>

    </div>
  );
};

export default CreateChallan;