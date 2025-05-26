import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationStatus } from "../enums";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager } from "@/features/auth";
import { httpErrorHandler } from "@/shared/validation";

type TDto = {
    id: string;

    data: {
        status: NotificationStatus;
    };
};

export function useUpdateNotification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(queryUrls.notifications.update(dto.id), dto.data, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notifications.base });
        },
        onError: httpErrorHandler
    });
}
