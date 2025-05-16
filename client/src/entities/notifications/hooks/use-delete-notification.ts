import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteNotification() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (notificationId: string) => {
            const token = credentialsManager.jwt.get();

            await axios.delete(queryUrls.notifications.delete(notificationId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notifications.base });
        }
    });

    return {
        deleteNotification: mutate,
        isPending
    };
}
