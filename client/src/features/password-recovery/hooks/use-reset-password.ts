import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useResetPassword() {
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const token = credentialsManager.jwt.get();

            await axios.post<void>(queryUrls.passwordRecovery.reset, null, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            toast.success("Пароль сброшен");
        },
        onError: httpErrorHandler
    });

    return {
        reset: mutate,
        isPending
    };
}
