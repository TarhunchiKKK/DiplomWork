import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { ConfirmInvitationDto } from "../dto/confirm-invitation.dto";

export const ConfirmInvitationDtoApiInfo = createEntityApiInfo<ConfirmInvitationDto>({
    username: {
        description: "Отображаемое имя пользователя",
        example: swaggerExampleValues.username
    },
    password: {
        description: "Отображаемое имя пользователя",
        example: swaggerExampleValues.password
    },
    token: {
        description: "Токен приглашения пользователя",
        example: swaggerExampleValues.jwt
    }
});
