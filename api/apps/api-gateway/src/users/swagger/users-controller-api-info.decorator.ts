import { createControllerApiInfo } from "common/swagger";
import { UsersController } from "../users.controller";
import { HttpStatus } from "@nestjs/common";

export const UsersControllerApiInfo = createControllerApiInfo<UsersController>({
    tags: "Аутентификация",

    methods: {
        sendInvitations: {
            operation: {
                summary: "Рассылка электронных писем-приглашений пользователям"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            }
        },
        confirmInvitation: {
            operation: {
                summary: "Подтверждение приглашённого пользователя"
            },
            response: {
                status: HttpStatus.OK,
                description: "Возвращает IAuthResponse"
            }
        }
    }
});
