import { createControllerApiInfo } from "common/swagger";
import { AuthController } from "../auth.controller";
import { HttpStatus } from "@nestjs/common";
import { AuthResponseDto } from "apps/api-gateway/src/swagger/auth-response.dto";

export const AuthControllerApiInfo = createControllerApiInfo<AuthController>({
    tags: "Аутентификация",

    methods: {
        registerAdmin: {
            operation: {
                summary: "Регистрация администратора организации"
            },
            response: {
                status: HttpStatus.CREATED,
                type: () => AuthResponseDto
            }
        },
        login: {
            operation: {
                summary: "Вход в аккаунт"
            },
            response: {
                status: HttpStatus.OK,
                type: () => AuthResponseDto
            }
        },
        me: {
            operation: {
                summary: "Получить профиль пользователя с новым jwt-токеном"
            },
            response: {
                status: HttpStatus.OK,
                type: () => AuthResponseDto
            },
            bearerAuth: true
        }
    }
});
