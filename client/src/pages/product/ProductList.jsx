import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProducts,
  deleteProduct,
} from "../services/product";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>

      <h2>Products</h2>

      <br />

      <input
        placeholder="Search Product"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <button
        onClick={() => navigate("/products/add")}
      >
        Add Product
      </button>

      <br /><br />

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td>{product.productName}</td>
              <td>{product.sku}</td>
              <td>{product.category}</td>
              <td>{product.unitPrice}</td>
              <td>{product.currentStock}</td>
              <td>{product.warehouse}</td>

              <td>

                <button
                  onClick={() =>
                    navigate(`/products/edit/${product.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(product.id)
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

export default ProductList;