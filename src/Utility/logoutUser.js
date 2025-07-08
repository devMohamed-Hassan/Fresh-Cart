import { toast } from "react-toastify";

export const logoutUser = (navigate) => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");

  setTimeout(() => {
    navigate("/login");
  }, 1500);
};
