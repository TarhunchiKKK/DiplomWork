import { createControllerApiInfo } from "common/swagger";
import { NotificationsController } from "../notifications.controller";
import { HttpStatus } from "@nestjs/common";

export const NotificationsControllerApi = createControllerApiInfo<NotificationsController>({
    tags: "Уведомления",

    methods: {
        userInvitation: {
            operation: {
                summary: "Отправление приглашений пользователям"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            }
        }
    }
});
