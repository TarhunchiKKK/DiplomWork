import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
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
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => toast.error(message));
        }
    });
}
