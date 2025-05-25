import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { TAuthResponse } from "../types";

type TDto = {
    userId: string;

    userEmail: string;

    pin: string;
};

type TOnSuccess = (_: TAuthResponse) => void;

export function useTotpLogin(onSuccess: TOnSuccess = () => {}) {
    return useMutation({
        mutationFn: async (dto: TDto) => {
            const response = await axios.post<TAuthResponse>(queryUrls.auth.totp.login, dto);
            return response.data;
        },
        onSuccess: response => {
            onSuccess(response);
        },
        onError: httpErrorHandler
    });
}
