import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../server/apiSettings";

export function useSettings() {
  const {
    isPending,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isPending, error, settings };
}
