import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { RegisterAdminDto } from "../dto/register-admin.dto";

export const RegisterAdminApiProperties = createEntityApiInfo<RegisterAdminDto>({
    username: {
        description: "Отображаемое имя пользователя",
        example: swaggerExampleValues.username
    },
    email: {
        description: "Отображаемое имя пользователя",
        example: swaggerExampleValues.email
    },
    password: {
        description: "Отображаемое имя пользователя",
        example: swaggerExampleValues.password
    }
});
