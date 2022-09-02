/*
   useMyMutation: common code for mutations
   mutationFunction:
        the mutate function -- the actual fetch
        takes 1 par (the object to be created/deleted/modified)
        returns a Promise - resolves in truthy if ok
        throw if a problem
   messageOnSuccess:
        a function that takes the object and returns a message-string
 */
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useMessageContext} from "../contexts/messagecontext";

export function useMyMutation(mutationFunction, query_id, messageOnSuccess) {
    const queryClient = useQueryClient()
    const {setMessage, setError} = useMessageContext();

    const mutation = useMutation({
        mutationFn: mutationFunction,
        onSuccess: async (result, book) => {
            setMessage(messageOnSuccess(book));
            await queryClient.invalidateQueries([query_id])
        },
    });
    return async (book) => {
        try {
            return await mutation.mutateAsync(book)
        } catch (e) {
            setError(e);
        }
    };
}