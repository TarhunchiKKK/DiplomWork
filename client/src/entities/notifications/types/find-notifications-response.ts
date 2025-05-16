import { DateFieldsToString } from "@/shared/api";
import { TNotification } from "../models";

export type TFindNotificationsResponse = {
    notifications: DateFieldsToString<TNotification>[];
};
