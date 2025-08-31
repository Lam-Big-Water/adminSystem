import {useMutation} from "@tanstack/react-query";
import {signUp as signUpApi} from "../../server/auth";

export function useSignUp () {
    const {mutate: signUp, isLoading} = useMutation({
        mutationFn: signUpApi,
        onSuccess: (user) => {
            console.log("Account successfully created! Please verufy the new account from the user's email address.")
        },
    });

    return {signUp, isLoading};
}