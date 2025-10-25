import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, getDataWithFilters } from "../../server/api";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetAllCabins() {
  
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAll,
  });

  return { isPending, error, cabins };
}



export function useGetCabinsByOpt() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount");
  const filter = !filterValue || filterValue === "all" 
      ? null
      : {field: "discount", value: filterValue};
      

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data, count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", filter, page],
    queryFn: () => getDataWithFilters({filter, page}),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", filter, page + 1],
      queryFn: () => getDataWithFilters({filter, page: page + 1}),
    })
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", filter, page - 1],
      queryFn: () => getDataWithFilters({filter, page: page - 1}),
    })
  }

  return { isPending, error, data, count };
}
