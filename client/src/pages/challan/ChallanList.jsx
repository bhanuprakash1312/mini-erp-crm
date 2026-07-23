import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getChallans } from "../../services/challan";

const ChallanList = () => {
  const navigate = useNavigate();

  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallans();
  }, []);

  const loadChallans = async () => {
    try {

      setLoading(true);

      const response = await getChallans();

      setChallans(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>

      <h2>Sales Challans</h2>

      <button
        onClick={() => navigate("/challans/create")}
      >
        Create Challan
      </button>

      <br />
      <br />

      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>Number</th>

            <th>Customer</th>

            <th>Status</th>

            <th>Total Qty</th>

            <th>Created By</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {challans.map((challan) => (

            <tr key={challan.id}>

              <td>{challan.challanNumber}</td>

              <td>{challan.customer.customerName}</td>

              <td>{challan.status}</td>

              <td>{challan.totalQuantity}</td>

              <td>{challan.user.name}</td>

              <td>

                <button
                  onClick={() =>
                    navigate(`/challans/${challan.id}`)
                  }
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ChallanList;