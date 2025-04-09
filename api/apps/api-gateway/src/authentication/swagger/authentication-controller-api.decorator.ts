import { createControllerApiInfo } from "common/swagger";
import { AuthenticationController } from "../authentication.controller";

export const AuthenticationControllerApi = createControllerApiInfo<AuthenticationController>({
    tags: "Аутентификация",

    methods: {
        registerAdmin: {
            operation: {
                summary: "Регистрация администратора организации"
            },
            response: {
                status: 200,
                description: "Создает пользователя с ролью ADMIN и новую организацию"
            }
        }
    }
});
