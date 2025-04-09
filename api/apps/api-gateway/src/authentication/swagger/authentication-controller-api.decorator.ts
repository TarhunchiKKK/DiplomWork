import { createControllerApiInfo } from "common/swagger";
import { AuthenticationController } from "../authentication.controller";
import { HttpStatus } from "@nestjs/common";

export const AuthenticationControllerApi = createControllerApiInfo<AuthenticationController>({
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
        }
    }
});
