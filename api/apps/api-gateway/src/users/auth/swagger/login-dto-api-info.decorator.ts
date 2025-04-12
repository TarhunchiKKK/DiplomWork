import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { LoginDto } from "../dto/login.dto";

export const LoginDtoApiInfo = createEntityApiInfo<LoginDto>({
    login: {
        description: "Отображаемое имя или электронная почта пользователя",
        example: swaggerExampleValues.user.email
    },
    password: {
        description: "Отображаемое имя пользователя",
        example: swaggerExampleValues.user.password
    }
});
