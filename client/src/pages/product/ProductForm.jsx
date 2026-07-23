import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createProduct,
  getProductById,
  updateProduct,
} from "../services/product";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    category: "",
    unitPrice: "",
    currentStock: "",
    minimumStock: "",
    warehouse: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await getProductById(id);

      setFormData({
        productName: response.data.productName || "",
        sku: response.data.sku || "",
        category: response.data.category || "",
        unitPrice: response.data.unitPrice || "",
        currentStock: response.data.currentStock || "",
        minimumStock: response.data.minimumStock || "",
        warehouse: response.data.warehouse || "",
      });
    } catch (error) {
      console.log(error);
      alert("Unable to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateProduct(id, formData);
        alert("Product updated successfully");
      } else {
        await createProduct(formData);
        alert("Product created successfully");
      }

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>

      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="unitPrice"
          placeholder="Unit Price"
          value={formData.unitPrice}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="currentStock"
          placeholder="Current Stock"
          value={formData.currentStock}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="minimumStock"
          placeholder="Minimum Stock"
          value={formData.minimumStock}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="warehouse"
          placeholder="Warehouse"
          value={formData.warehouse}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          {isEdit ? "Update Product" : "Create Product"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/products")}
        >
          Cancel
        </button>

      </form>

    </div>
  );
};

export default ProductForm;