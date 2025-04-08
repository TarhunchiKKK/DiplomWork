import { IRegisterAdminDto } from "common/grpc";
import { createEntityApiInfo } from "common/swagger";

export const RegisterAdminApiProperties = createEntityApiInfo<IRegisterAdminDto>({
    username: {
        description: "Отображаемое имя пользователя",
        example: "nickname"
    },
    email: {
        description: "Отображаемое имя пользователя",
        example: "ivanov@gmail.com"
    },
    password: {
        description: "Отображаемое имя пользователя",
        example: "Password123?"
    }
});
