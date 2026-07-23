import { useEffect, useState } from "react";
import { getInventoryHistory } from "../services/inventory";

const InventoryHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const loadHistory = async () => {
    try {
      setLoading(true);

      const response = await getInventoryHistory(page, limit);

      setHistory(response.data);
      setTotalPages(response.totalPages);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [page]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>

      <h2>Inventory History</h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Movement</th>
            <th>Reason</th>
            <th>Created By</th>
            <th>Date</th>
          </tr>

        </thead>

        <tbody>

          {history.map((item) => (

            <tr key={item.id}>

              <td>{item.product.productName}</td>

              <td>{item.quantity}</td>

              <td>{item.movementType}</td>

              <td>{item.reason}</td>

              <td>{item.user.name}</td>

              <td>
                {new Date(item.createdAt).toLocaleString()}
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

export default InventoryHistory;