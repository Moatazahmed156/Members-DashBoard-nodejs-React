export const BaseURL = "http://localhost:3000";
const token = localStorage.getItem("token");
export const header = {
  headers: { Authorization: `Bearer ${token}` },
};
