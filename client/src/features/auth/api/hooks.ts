import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { TRegisterAdminDto, TRegisterAdmiResponse } from "./types";
import { queryUrls, TValidationError } from "@/shared/api";
import { mutationKeys } from "./constants";

export function useRegisterAdmin() {
    const { mutate, isPending, error } = useMutation({
        mutationKey: mutationKeys.registerAdmin,
        mutationFn: async (dto: TRegisterAdminDto) => {
            const response = await axios.post<TRegisterAdmiResponse>(queryUrls.auth.registerAdmin, dto);
            return response.data;
        }
    });

    return {
        register: mutate,
        isPending,
        error: error as AxiosError<TValidationError>
    };
}
