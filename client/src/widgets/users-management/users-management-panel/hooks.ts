import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useChangeUserStatus() {
    const token = credentialsManager.jwt.get();

    const onError = () => {
        toast.error("Ошибка");
    };

    const { mutate: activate } = useMutation({
        mutationFn: async (userId: string) => {
            await axios.patch<void>(
                queryUrls.users.activate(userId),
                {},
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onError: onError
    });

    const { mutate: deactivate } = useMutation({
        mutationFn: async (userId: string) => {
            await axios.patch<void>(
                queryUrls.users.deactivate(userId),
                {},
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onError: onError
    });

    return { activate, deactivate };
}
