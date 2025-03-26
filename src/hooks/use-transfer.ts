import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Transfer } from "@/models/transfer";

export const useTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transfer = async (data: Transfer) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transfer`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message || "Error al realizar la transacción"
        );
      } else {
        setError("Ocurrio un error");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { transfer, loading, error };
};
