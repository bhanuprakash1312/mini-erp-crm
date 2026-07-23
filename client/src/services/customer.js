import api from "./axios";

export const getCustomers = async (page = 1, limit = 10, search = "") => {
  const response = await api.get(
    `/customers?page=${page}&limit=${limit}&search=${search}`
  );
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (data) => {
  const response = await api.post("/customers", data);
  return response.data;
};

export const updateCustomer = async (id, data) => {
  const response = await api.put(`/customers/${id}`, data);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
};