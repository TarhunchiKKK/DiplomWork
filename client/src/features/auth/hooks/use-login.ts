import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryUrls, TMutationOptions } from "@/shared/api";
import { toast } from "sonner";
import { httpErrorHandler } from "@/shared/validation";
import { TAuthResponse } from "../types";

type TDto = {
    login: string;

    password: string;
};

export function useLogin(options: TMutationOptions<TAuthResponse> = {}) {
    return useMutation({
        mutationFn: async (dto: TDto) => {
            const response = await axios.post<TAuthResponse>(queryUrls.auth.login, dto);
            return response.data;
        },
        onSuccess: response => {
            toast.success("Успешный вход");

            if (response) {
                options.onSuccess?.(response);
            }
        },
        onError: httpErrorHandler
    });
}
