import { createControllerApiInfo, swaggerExampleValues } from "common/swagger";
import { AuthController } from "../auth.controller";
import { HttpStatus } from "@nestjs/common";

export const AuthControllerApiInfo = createControllerApiInfo<AuthController>({
    tags: "Аутентификация",

    methods: {
        registerAdmin: {
            operation: {
                summary: "Регистрация администратора организации"
            },
            response: {
                status: HttpStatus.CREATED,
                example: swaggerExampleValues.auth.response
            }
        },
        login: {
            operation: {
                summary: "Вход в аккаунт"
            },
            response: {
                status: HttpStatus.OK,
                example: swaggerExampleValues.auth.response
            }
        },
        me: {
            operation: {
                summary: "Получить профиль пользователя с новым jwt-токеном"
            },
            response: {
                status: HttpStatus.OK,
                example: swaggerExampleValues.auth.response
            },
            bearerAuth: true
        }
    }
});
