import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { InviteUsersDto } from "../dto/invite-users.dto";

export const InviteUsersDtoApiInfo = createEntityApiInfo<InviteUsersDto>({
    organizationId: {
        description: "Идентификатор организации",
        example: swaggerExampleValues.id.mongo
    },
    adminEmail: {
        description: "Электронная почта отправителя(администратора организации)",
        example: swaggerExampleValues.user.email
    },
    emails: {
        description: "Массив электронных почт пользователей",
        isArray: true,
        type: () => [String],
        example: ["user1@gmail.com", "user2@gmail.com", "user3@gmail.com"]
    }
});
