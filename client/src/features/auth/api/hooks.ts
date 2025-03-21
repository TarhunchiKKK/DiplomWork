import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { TRegisterAdminDto, TRegisterAdmiResponse } from "./types";
import { queryUrls, TValidationError } from "@/shared/api";
import { mutationKeys } from "./constants";
import { localStorageService } from "@/shared/utils";
import { useProfileStore } from "../lib";
import { toast } from "sonner";

export function useRegisterAdmin() {
    const setProfile = useProfileStore(satte => satte.setProfile);

    const { mutate, isPending } = useMutation({
        mutationKey: mutationKeys.registerAdmin,
        mutationFn: async (dto: TRegisterAdminDto) => {
            const response = await axios.post<TRegisterAdmiResponse>(queryUrls.auth.registerAdmin, dto);
            return response.data;
        },
        onSuccess: (response: TRegisterAdmiResponse) => {
            toast.success("Успешный вход");

            localStorageService.token.set(response.token);

            setProfile({
                id: response.id,
                email: response.email,
                role: response.role,
                username: response.username
            });
        },
        onError: (error: AxiosError<TValidationError>) => {
            error.response?.data.message.slice(0, 3).forEach(message => {
                toast.error(message);
            });
        }
    });

    return {
        register: mutate,
        isPending
    };
}
