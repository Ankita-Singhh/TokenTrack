//Admin APIs

import api from "./api";

export const getAnalytics = async () => {
  const response = await api.get("/admin/analytics");
  return response.data;
};

export const createManager = async (managerData) => {
  const response = await api.post("/admin/create-manager", managerData);
  return response.data;
};

export const createMess = async (messData) => {
  const response = await api.post("/mess", messData);
  return response.data;
};

export const getManagers = async () => {
  const response = await api.get("/admin/managers");
  return response.data;
};

export const getMesses = async () => {
  const response = await api.get("/mess");
  return response.data;
};

export const assignManager = async (data) => {
  const response = await api.put("/admin/assign-manager", data);
  return response.data;
};

export const getStudentsByStatus = async (status) => {
  const response = await api.get(
    `/admin/students?status=${status}`
  );

  return response.data.students;
};

export const getManagersList = async () => {
  const response = await api.get("/admin/managers");
  return response.data.managers;
};
