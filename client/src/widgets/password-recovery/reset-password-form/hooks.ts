import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useResetPassword() {
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const token = credentialsManager.jwt.get();

            await axios.post<void>(
                queryUrls.passwordRecovery.reset,
                {},
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
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
