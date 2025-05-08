import { authCredentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useResetPassword() {
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const jwt = authCredentialsManager.jwt.get();

            await axios.post<void>(
                queryUrls.passwordRecovery.reset,
                {},
                {
                    headers: new HttpHeadersBuilder().setBearerToken(jwt).get()
                }
            );
        },
        onSuccess: () => {
            toast.success("Пароль сброшен");
        }
    });

    return {
        reset: mutate,
        isPending
    };
}
