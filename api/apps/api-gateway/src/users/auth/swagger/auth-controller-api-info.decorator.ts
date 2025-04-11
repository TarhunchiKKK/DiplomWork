import { createControllerApiInfo } from "common/swagger";
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
                description: "Объект с профилем пользователя, идентификатором созданной организации и JWT-токеном"
            }
        },
        login: {
            operation: {
                summary: "Вход в аккаунт"
            },
            response: {
                status: HttpStatus.OK,
                description: "Объект с профилем пользователя, идентификатором его организации и JWT-токеном"
            }
        },
        me: {
            operation: {
                summary: "Получить профиль пользователя с новым jwt-токеном"
            },
            response: {
                status: HttpStatus.OK,
                description: "Профиль пользователя"
            },
            bearerAuth: true
        }
    }
});
