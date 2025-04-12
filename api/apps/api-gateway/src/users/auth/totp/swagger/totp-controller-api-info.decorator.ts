import { createControllerApiInfo, swaggerExampleValues } from "common/swagger";
import { TotpController } from "../totp.controller";
import { HttpStatus } from "@nestjs/common";

export const TotpControllerApiInfo = createControllerApiInfo<TotpController>({
    tags: "TOTP-аутентификация",

    methods: {
        generate: {
            operation: {
                summary: "Генерация QR-кода и секрета для TOTP-аутентификации"
            },
            response: {
                status: HttpStatus.OK,
                description: "Возвращает ссылку на QR-код и секрет для TOTP-аутентификации"
            },
            bearerAuth: true
        },
        enable: {
            operation: {
                summary: "Включение двухфакторной TOTP-аутентификации у пользователя"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        },
        disable: {
            operation: {
                summary: "Отключение двухфакторной TOTP-аутентификации у пользователя"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        },
        login: {
            operation: {
                summary: "Вход с помощью TOTP"
            },
            response: {
                status: HttpStatus.OK,
                example: swaggerExampleValues.auth.response
            },
            bearerAuth: true
        }
    }
});
