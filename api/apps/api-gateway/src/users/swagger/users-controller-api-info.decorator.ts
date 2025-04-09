import { createControllerApiInfo } from "common/swagger";
import { UsersController } from "../users.controller";
import { HttpStatus } from "@nestjs/common";

export const UsersControllerApiInfo = createControllerApiInfo<UsersController>({
    tags: "Аутентификация",

    methods: {
        registerAdmin: {
            operation: {
                summary: "Регистрация администратора организации"
            },
            response: {
                status: HttpStatus.OK,
                description: "Объект с данными пользователя, идентификатором созданной организации и JWT-токеном"
            }
        },
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
