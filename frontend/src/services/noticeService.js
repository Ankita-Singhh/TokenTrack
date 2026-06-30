import api from "./api";

export const getRecentNotices = async () => {
  const response = await api.get("/admin/notices");
  return response.data;
};


export const createNotice = async (noticeData) => {
  const response = await api.post(
    "/notices",
    noticeData
  );
  return response.data;
};

export const createGlobalNotice = async (noticeData) => {
  const response = await api.post(
    "/admin/notices",
    noticeData
  );
  return response.data;
};

export const deleteNotice = async (id) => {
  const response = await api.delete(`/admin/notices/${id}`);
  return response.data;
};

export const updateNotice = async (id, noticeData) => {
  const response = await api.put(
    `/admin/notices/${id}`,
    noticeData
  );

  return response.data;
};