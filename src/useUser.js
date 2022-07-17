import { fetchCurrentUser } from "./ApiCalls";
import { CURRENT_USER_URL } from "../config";
import useSWR from "swr";

const useUser = () => {
  const { data, error } = useSWR(CURRENT_USER_URL, fetchCurrentUser);

  return {
    user: data,
    isLoading: !error && !data,
  };
};

export default useUser;
