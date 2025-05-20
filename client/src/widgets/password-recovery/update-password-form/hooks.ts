import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { TUpdatePasswordFormState } from "./types";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { credentialsManager } from "@/features/auth";

export function useUpdatePassword() {
    const { token } = useParams();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdatePasswordFormState) => {
            const jwt = credentialsManager.jwt.get();

            await axios.patch<void>(
                queryUrls.passwordRecovery.update,
                {
                    ...dto,
                    token
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(jwt).build()
                }
            );
        },
        onSuccess: () => {
            toast.success("Пароль обновлен");
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return { update: mutate, isPending };
}
