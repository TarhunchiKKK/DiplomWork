import { IRegisterAdminDto } from "common/grpc";
import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";

export const RegisterAdminApiProperties = createEntityApiInfo<IRegisterAdminDto>({
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
