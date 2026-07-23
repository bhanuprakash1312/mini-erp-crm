import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) return <h2>Loading...</h2>;

  return (
    <div>

      <h1>Dashboard</h1>

      <hr />

      <h2>Summary</h2>

      <p>Total Customers : {dashboard.summary.totalCustomers}</p>

      <p>Total Products : {dashboard.summary.totalProducts}</p>

      <p>Total Challans : {dashboard.summary.totalChallans}</p>

      <p>Low Stock Products : {dashboard.summary.lowStockProducts}</p>

      <hr />

      <h2>Recent Challans</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Number</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>

          {dashboard.recentChallans.map((challan) => (

            <tr key={challan.id}>

              <td>{challan.challanNumber}</td>

              <td>{challan.customer.customerName}</td>

              <td>{challan.status}</td>

              <td>{challan.totalQuantity}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr />

      <h2>Recent Inventory</h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Product</th>
            <th>Movement</th>
            <th>Quantity</th>
            <th>Reason</th>
          </tr>

        </thead>

        <tbody>

          {dashboard.recentInventory.map((item) => (

            <tr key={item.id}>

              <td>{item.product.productName}</td>

              <td>{item.movementType}</td>

              <td>{item.quantity}</td>

              <td>{item.reason}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Dashboard;