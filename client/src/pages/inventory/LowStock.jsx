import { useEffect, useState } from "react";
import { getLowStock } from "../../services/inventory";

const LowStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {

      setLoading(true);

      const response = await getLowStock();

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>

      <h2>Low Stock Products</h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>Product</th>

            <th>Category</th>

            <th>Current Stock</th>

            <th>Minimum Stock</th>

            <th>Warehouse</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td>{product.productName}</td>

              <td>{product.category}</td>

              <td>{product.currentStock}</td>

              <td>{product.minimumStock}</td>

              <td>{product.warehouse}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default LowStock;