import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getChallanById,
  updateChallanStatus,
} from "../../services/challan";

const ChallanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [challan, setChallan] = useState(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");

  useEffect(() => {
    loadChallan();
  }, []);

  const loadChallan = async () => {
    try {
      setLoading(true);

      const response = await getChallanById(id);

      setChallan(response.data);
      setStatus(response.data.status);

    } catch (error) {
      console.log(error);
      alert("Unable to load challan");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await updateChallanStatus(id, status);

      alert("Status Updated");

      loadChallan();

    } catch (error) {
      console.log(error);
      alert("Unable to update status");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (!challan) return <h2>Challan Not Found</h2>;

  return (
    <div>

      <button onClick={() => navigate("/challans")}>
        Back
      </button>

      <h2>Challan Details</h2>

      <hr />

      <p>
        <strong>Challan Number :</strong>{" "}
        {challan.challanNumber}
      </p>

      <p>
        <strong>Customer :</strong>{" "}
        {challan.customer.customerName}
      </p>

      <p>
        <strong>Business :</strong>{" "}
        {challan.customer.businessName}
      </p>

      <p>
        <strong>Created By :</strong>{" "}
        {challan.user.name}
      </p>

      <p>
        <strong>Total Quantity :</strong>{" "}
        {challan.totalQuantity}
      </p>

      <p>
        <strong>Created At :</strong>{" "}
        {new Date(challan.createdAt).toLocaleString()}
      </p>

      <hr />

      <h3>Products</h3>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>

          {challan.items.map((item) => (

            <tr key={item.id}>

              <td>{item.productName}</td>

              <td>{item.quantity}</td>

              <td>{item.unitPrice}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <br />

      <h3>Status</h3>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="PENDING">PENDING</option>
        <option value="CONFIRMED">CONFIRMED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>

      <button onClick={handleStatusUpdate}>
        Update Status
      </button>

    </div>
  );
};

export default ChallanDetails;