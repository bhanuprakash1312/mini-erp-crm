import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { stockOut } from "../services/inventory";
import { getProducts } from "../services/product";

const StockOut = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

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
        e.target.name === "productId" ||
        e.target.name === "quantity"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await stockOut(formData);

      alert("Stock Removed Successfully");

      navigate("/inventory/history");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Unable to remove stock"
      );
    }
  };

  return (
    <div>

      <h2>Stock Out</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Product</label>
          <br />

          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
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
        </div>

        <br />

        <div>
          <label>Quantity</label>
          <br />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
          />
        </div>

        <br />

        <div>
          <label>Reason</label>
          <br />

          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
          />
        </div>

        <br />

        <button type="submit">
          Stock Out
        </button>

        <button
          type="button"
          onClick={() => navigate("/inventory/history")}
        >
          Cancel
        </button>

      </form>

    </div>
  );
};

export default StockOut;