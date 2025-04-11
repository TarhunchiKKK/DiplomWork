import { createControllerApiInfo } from "common/swagger";
import { PasswordRecoveryController } from "../password-recovery.controller";
import { HttpStatus } from "@nestjs/common";

export const PasswordRecoveryControllerApiInfo = createControllerApiInfo<PasswordRecoveryController>({
    tags: "Сброс пароля",

    methods: {
        reset: {
            operation: {
                summary: "Запрос на изменение пароля пользователя"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        },
        update: {
            operation: {
                summary: "Смена пароля пользователя"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        }
    }
});
