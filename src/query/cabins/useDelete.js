import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeRow } from "../../server/api";

export function useDelete () {
    const queryClient = useQueryClient();

    const {mutate: deleteData, isPending: isDeleting} = useMutation({
        // useMutation 的 mutationFn 默认只接收 一个参数，多参数会被忽略。
        mutationFn: ({id, deleteUrl}) => removeRow(id, deleteUrl),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cabins']});
        },
        onError: (err) => console.error(err.message)
    });

    return {deleteData, isDeleting}
}