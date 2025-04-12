import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { ConfirmInvitationDto } from "../dto/confirm-invitation.dto";

export const ConfirmInvitationDtoApiInfo = createEntityApiInfo<ConfirmInvitationDto>({
    username: {
        description: "Отображаемое имя пользователя",
        example: swaggerExampleValues.user.username
    },
    password: {
        description: "Пароль пользователя",
        example: swaggerExampleValues.user.password
    },
    token: {
        description: "Токен приглашения пользователя",
        example: swaggerExampleValues.jwt
    }
});
