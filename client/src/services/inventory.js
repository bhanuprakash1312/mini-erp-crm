import api from "./axios";

// Stock In
export const stockIn = async (data) => {
  const response = await api.post("/inventory/stock-in", data);
  return response.data;
};

// Stock Out
export const stockOut = async (data) => {
  const response = await api.post("/inventory/stock-out", data);
  return response.data;
};

// Inventory History
export const getInventoryHistory = async (
  page = 1,
  limit = 10
) => {
  const response = await api.get(
    `/inventory/history?page=${page}&limit=${limit}`
  );

  return response.data;
};

// Low Stock Products
export const getLowStock = async () => {
  const response = await api.get("/inventory/low-stock");
  return response.data;
};