import { createControllerApiInfo } from "common/swagger";
import { AccountDeactivationController } from "../account-deactivation.controller";
import { HttpStatus } from "@nestjs/common";

export const AccountDeactivationControllerApiInfo = createControllerApiInfo<AccountDeactivationController>({
    tags: "Деактивация аккаунта",

    methods: {
        activate: {
            operation: {
                summary: "Активация пользователя"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        },
        deactivate: {
            operation: {
                summary: "Деактивация пользователя"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        }
    }
});
