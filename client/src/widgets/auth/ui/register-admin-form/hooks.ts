import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { extractValidationMessages, TValidationError } from "@/shared/validation";
import { TRegisterDto, TRegisterResponse } from "./types";
import { authCredentialsManager, useProfileStore } from "@/features/auth";

export function useRegister() {
    const setProfile = useProfileStore(state => state.setProfile);

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TRegisterDto) => {
            const response = await axios.post<TRegisterResponse>(queryUrls.auth.registerAdmin, dto);
            return response.data;
        },
        onSuccess: response => {
            toast.success("Успешный вход");

            authCredentialsManager.jwt.set(response.token);

            setProfile({
                id: response.id,
                email: response.email,
                role: response.role,
                username: response.username
            });
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return {
        register: mutate,
        isPending
    };
}
