import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { httpErrorHandler } from "@/shared/validation";
import { credentialsManager } from "@/features/auth";

type TDto = {
    password: string;

    token: string;
};

export function useUpdatePassword() {
    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TDto) => {
            const jwt = credentialsManager.jwt.get();

            await axios.patch<void>(queryUrls.passwordRecovery.update, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(jwt).build()
            });
        },
        onSuccess: () => {
            toast.success("Пароль обновлен");
        },
        onError: httpErrorHandler
    });

    return { update: mutate, isPending };
}
