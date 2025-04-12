import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { UpdatePasswordDto } from "../dto/update-password.dto";

export const UpdatePasswordDtoApiInfo = createEntityApiInfo<UpdatePasswordDto>({
    password: {
        description: "Новый пароль пользователя",
        example: swaggerExampleValues.user.password
    },
    token: {
        description: "Токен смены пароля",
        example: swaggerExampleValues.auth.jwt
    }
});
