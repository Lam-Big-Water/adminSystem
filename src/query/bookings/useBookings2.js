import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../server/apiBookings2";

export function useBookings() {
    return useQuery({
        queryKey: ["bookings2"],
        queryFn: getBookings,
        select: (data) => ({
            bookings: data.data.map(({ cabins, guests, ...rest }) => ({
                ...rest,
                cabinName: cabins.name,
                guestEmail: guests.email,
                guestFullName: guests.fullName
            })),
            count: data.count
        })
    });
}