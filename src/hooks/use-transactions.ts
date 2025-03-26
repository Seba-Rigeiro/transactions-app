import useSWR from "swr";
import axios from "axios";
import { Transaction } from "@/models/transaction";

interface TransactionsFilters {
  from?: string;
  to?: string;
  sourceAccountId?: number;
}

const fetcher = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useTransactions = (filters?: TransactionsFilters) => {
  const token = localStorage.getItem("token");

  let url = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;

  const params = new URLSearchParams();

  if (filters?.from) params.append("from", filters.from);
  if (filters?.to) params.append("to", filters.to);
  if (filters?.sourceAccountId)
    params.append("sourceAccountId", filters.sourceAccountId.toString());

  if (params.toString()) url += `?${params.toString()}`;

  const { data, error, isLoading } = useSWR(
    token ? [url, token] : null,
    ([url, token]) => fetcher(url, token)
  );

  return {
    transactions: data as Transaction[],
    isLoading,
    error,
  };
};
