import { useAxiosPrivate } from "./useAxiosPrivate";
import useSWR from "swr";
import { useUser } from "./useUser";

export const useHistoryAdmin = () => {
  const { user } = useUser();
  const axiosPrivateInstance = useAxiosPrivate();

  const fethcer = (url) =>
    axiosPrivateInstance
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR("/api/admin/history", fethcer);

  return { data, error, isLoading };
};
