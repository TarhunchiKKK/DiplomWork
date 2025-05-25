import { useQuery } from "@tanstack/react-query";
import { NotificationStatus, NotificationSubject } from "../enums";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager } from "@/features/auth";
import axios from "axios";
import { TFindNotificationsResponse } from "../types";
import { transformNotification } from "../helpers";

type TQueryParams = {
    status?: NotificationStatus;

    subject?: NotificationSubject;
};

export function useNotifications(queryParams: TQueryParams = {}) {
    const { data, isLoading } = useQuery({
        queryKey: queryKeys.notifications.findAll(queryParams),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TFindNotificationsResponse>(queryUrls.notifications.findAll, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build(),
                params: queryParams
            });

            return response.data.notifications ?? [];
        },
        select: notifications => notifications.map(transformNotification)
    });

    return {
        notifications: data,
        isLoading
    };
}
