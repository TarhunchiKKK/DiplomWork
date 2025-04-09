import { createControllerApiInfo } from "common/swagger";
import { UsersController } from "../users.controller";
import { HttpStatus } from "@nestjs/common";

export const UsersControllerApi = createControllerApiInfo<UsersController>({
    tags: "Пользователи",

    methods: {
        sendInvitations: {
            operation: {
                summary: "Рассылка электронных писем-приглашений пользователям"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            }
        }
    }
});
