import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TProps, TTotpLoginResponse } from "./types";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";

export function useTotpLogin(props: TProps) {
    const { mutate, isPending } = useMutation({
        mutationFn: async (pin: string) => {
            const response = await axios.post<TTotpLoginResponse>(queryUrls.auth.totp.login, {
                ...props.payload,
                pin
            });
            return response.data;
        },
        onSuccess: response => {
            toast.success("Успешный вход");

            props.next(response);
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
