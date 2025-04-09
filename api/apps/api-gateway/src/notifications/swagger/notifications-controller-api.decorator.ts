import { createControllerApiInfo } from "common/swagger";
import { NotificationsController } from "../notifications.controller";

export const NotificationsControllerApi = createControllerApiInfo<NotificationsController>({
    tags: "Уведомления",

    methods: {
        userInvitation: {
            operation: {
                summary: "Отправление приглашений пользователям"
            },
            response: {
                status: 200,
                description: "Отправляет электронные письма-приглашения пользователям"
            }
        }
    }
});
