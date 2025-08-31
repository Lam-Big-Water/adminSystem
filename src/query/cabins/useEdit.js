import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCombineEdit } from "../../server/api";

export function useEdit () {
    const queryClient = useQueryClient();

    const {mutate: editData, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createCombineEdit(newData, id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cabins"]});
        },
        onError: (err) => console.error(err.message)
    });

    return {editData, isEditing}
}