import { useQuery } from "@tanstack/react-query";
import {listUsers} from "../../server/apiUser"


export function useGetUsers() {
  
  const {
    isPending,
    data,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: listUsers,
  });

  return { isPending, error, data };
}