import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../server/apiBookings";

export function useTodayActivity() {
  const { isPending, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isPending };
}
