//Login, Register, Logout
import api from "./api";

export const getCurrentUser = async () => {
  const res = await api.get("/auth/profile");
  return res.data.user;
};