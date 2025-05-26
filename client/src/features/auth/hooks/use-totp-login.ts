import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryUrls, TMutationOptions } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { TAuthResponse } from "../types";

type TDto = {
    userId: string;

    userEmail: string;

    pin: string;
};

export function useTotpLogin(options: TMutationOptions<TAuthResponse> = {}) {
    return useMutation({
        mutationFn: async (dto: TDto) => {
            const response = await axios.post<TAuthResponse>(queryUrls.auth.totp.login, dto);
            return response.data;
        },
        onSuccess: response => {
            options.onSuccess?.(response);
        },
        onError: httpErrorHandler
    });
}
