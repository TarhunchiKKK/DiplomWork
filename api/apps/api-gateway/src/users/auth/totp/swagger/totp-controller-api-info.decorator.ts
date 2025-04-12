import { createControllerApiInfo } from "common/swagger";
import { TotpController } from "../totp.controller";
import { HttpStatus } from "@nestjs/common";

export const TotpControllerApiInfo = createControllerApiInfo<TotpController>({
    tags: "TOTP-аутентификация",

    methods: {
        generateTotp: {
            operation: {
                summary: "Генерация QR-кода и секрета для TOTP-аутентификации"
            },
            response: {
                status: HttpStatus.OK,
                description: "Возвращает ссылку на QR-код и секрет для TOTP-аутентификации"
            },
            bearerAuth: true
        }
    }
});
