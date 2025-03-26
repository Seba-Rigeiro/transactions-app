import { User } from "@/models/user";
import axios from "axios";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLoginClick = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const onLoginSubmit = async (user: User) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        user
      );
      const receivedToken = response.data.access_token;
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      handleLoginClose();
    } catch (error) {
      console.error("CATCH", error);
    }
  };

  return {
    openLogin,
    token,
    handleLoginClick,
    handleLoginClose,
    handleLogout,
    onLoginSubmit,
  };
};
