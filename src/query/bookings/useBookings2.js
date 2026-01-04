import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../server/apiBookings2";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("Status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  return useQuery({
    queryKey: ["bookings2", filter],
    queryFn: () => getBookings({filter}),
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
}
