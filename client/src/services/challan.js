import api from "./axios";

export const getChallans = async () => {
  const response = await api.get("/challans");
  return response.data;
};

export const getChallanById = async (id) => {
  const response = await api.get(`/challans/${id}`);
  return response.data;
};

export const createChallan = async (data) => {
  const response = await api.post("/challans", data);
  return response.data;
};

export const updateChallanStatus = async (id, status) => {
  const response = await api.patch(
    `/challans/${id}/status`,
    { status }
  );

  return response.data;
};