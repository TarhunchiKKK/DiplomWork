import { Role } from "common/enums";
import { IAuthResponse } from "common/grpc";
import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";

export const AuthResponseDtoApiInfo = createEntityApiInfo<AuthResponseDto>({
    id: {
        description: "ID",
        example: swaggerExampleValues.id.uuid
    },
    username: {
        description: "Отображаемое имя",
        example: swaggerExampleValues.user.username
    },
    email: {
        description: "Электронная почта",
        example: swaggerExampleValues.user.email
    },
    role: {
        description: "Привелегии пользователя",
        example: Role.ADMIN
    },
    organizationId: {
        description: "ID организации",
        example: swaggerExampleValues.id.mongo
    },
    token: {
        description: "JWT-токен",
        example: swaggerExampleValues.auth.jwt
    }
});

@AuthResponseDtoApiInfo()
export class AuthResponseDto implements IAuthResponse {
    id: string;

    username: string;

    email: string;

    role: string;

    organizationId: string;

    token: string;
}
