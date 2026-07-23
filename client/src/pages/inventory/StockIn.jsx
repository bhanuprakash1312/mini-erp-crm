import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { stockIn } from "../services/inventory";
import { getProducts } from "../services/product";

const StockIn = () => {
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
        e.target.name === "quantity" ||
        e.target.name === "productId"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await stockIn(formData);

      alert("Stock Added Successfully");

      navigate("/inventory/history");

    } catch (error) {
      console.log(error);
      alert("Unable to add stock");
    }
  };

  return (
    <div>

      <h2>Stock In</h2>

      <form onSubmit={handleSubmit}>

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

        <br /><br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Stock In
        </button>

      </form>

    </div>
  );
};

export default StockIn;