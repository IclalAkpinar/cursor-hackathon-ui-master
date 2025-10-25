import { UseGetFunction } from "../hooks";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await UseGetFunction<boolean>("/auth/logout");

    if (response.error) {
      alert("Bir hata var!");
    } else if (response.data) {
      navigate("/");
      window.location.reload();
    } else {
      alert("Çıkış yapılırken bir hata oluştu!");
    }
  };

  return handleLogout;
};
