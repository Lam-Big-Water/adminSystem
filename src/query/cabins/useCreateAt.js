import { useQuery } from "@tanstack/react-query";
import { getFileMetadata } from "../server/api";

export function useCreateAt (fileName) {
    return useQuery({
        queryKey: ["date", {fileName}],
        queryFn: () => getFileMetadata(fileName),
        gcTime: 5000,
    })
}