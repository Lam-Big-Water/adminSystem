import {useMutation, useQueryClient} from '@tanstack/react-query'
import { createCombineEdit } from '../../server/api'

export function useCreate () {
    const queryClient = useQueryClient();

    const {mutate: createNew, isPending: isCreating} = useMutation({
        mutationFn: createCombineEdit,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cabins"]});
        },
        onError: (err) => console.error(err.message),
    });

    return {createNew, isCreating};
}