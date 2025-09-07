import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCombineEdit } from "../../server/api";
import { ToastContext } from "../../context/Toast/ToastProvider";

export function useEdit () {
    const queryClient = useQueryClient();
    const {createToast} = React.useContext(ToastContext);


    const {mutate: editData, isPending: isEditing} = useMutation({
        mutationFn: ({newData, id}) => createCombineEdit(newData, id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cabins"]});
            createToast("Successfully", "success")
        },
        onError: (err) => console.error(err.message)
    });

    return {editData, isEditing}
}