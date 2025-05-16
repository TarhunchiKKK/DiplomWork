import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationStatus } from "../enums";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager } from "@/features/auth";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { toast } from "sonner";

type TDto = {
    notificationId: string;

    data: {
        status: NotificationStatus;
    };
};

export function useUpdateNotification() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(queryUrls.notifications.update(dto.notificationId), dto.data, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notifications.base });
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => toast.error(message));
        }
    });

    return {
        updateNotification: mutate,
        isPending
    };
}
