import apiClient from '@/middleware/api';
import { useEffect, useState } from "react";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const subscription = async () => {

      await apiClient
        .get(`/me`)
        .then((res: any) => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch((error: any) => {
          setError(error?.message);
          setLoading(false);
        });
    };
    subscription();
  }, [refetch]);

  return { loading, user, error, setRefetch, refetch };
}
