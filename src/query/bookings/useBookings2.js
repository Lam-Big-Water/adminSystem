import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../server/apiBookings2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("Status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {isPending, data} = useQuery({
    queryKey: ["bookings2", filter, page],
    queryFn: () => getBookings({filter, page}),
    select: (data) => ({
      bookings: data.data.map(({ cabins, guests, ...rest }) => ({
        ...rest,
        cabinName: cabins.name,
        guestEmail: guests.email,
        guestFullName: guests.fullName,
      })),
      count: data.count,
    }),
  });

  return {isPending, data}
}
