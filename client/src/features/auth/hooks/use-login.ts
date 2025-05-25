import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { extractValidationMessages, TValidationError } from "@/shared/validation";
import { TAuthResponse } from "../types";

type TDto = {
    login: string;

    password: string;
};

type TOnSuccess = (_: TAuthResponse) => void;

export function useLogin(onSuccess: TOnSuccess = () => {}) {
    return useMutation({
        mutationFn: async (dto: TDto) => {
            const response = await axios.post<TAuthResponse>(queryUrls.auth.login, dto);
            return response.data;
        },
        onSuccess: response => {
            toast.success("Успешный вход");

            onSuccess(response);
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => toast.error(message));
        }
    });
}
