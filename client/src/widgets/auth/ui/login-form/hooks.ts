import { authCredentialsManager, useProfileStore } from "@/features/auth";
import { useMutation } from "@tanstack/react-query";
import { TLoginDto, TLoginResponse } from "./types";
import axios, { AxiosError } from "axios";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { extractValidationMessages, TValidationError } from "@/shared/validation";

export function useLogin() {
    const setProfile = useProfileStore(state => state.setProfile);

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TLoginDto) => {
            const response = await axios.post<TLoginResponse>(queryUrls.auth.login, dto);
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
