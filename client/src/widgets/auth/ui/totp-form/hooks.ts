import { authCredentialsManager, useProfileStore } from "@/features/auth";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TTotpLoginResponse } from "./types";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";

export function useTotpLogin() {
    const profile = useProfileStore(state => state.profile);
    const setProfile = useProfileStore(state => state.setProfile);

    const { mutate, isPending } = useMutation({
        mutationFn: async (pin: string) => {
            const response = await axios.post<TTotpLoginResponse>(queryUrls.auth.totpLogin, {
                pin,
                userId: profile?.id,
                useremail: profile?.email
            });
            return response.data;
        },
        onSuccess: response => {
            toast.success("Успешный вход");

            authCredentialsManager.jwt.set(response.token);

            setProfile(response);
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => toast.error(message));
        }
    });

    return {
        login: mutate,
        isPending
    };
}
