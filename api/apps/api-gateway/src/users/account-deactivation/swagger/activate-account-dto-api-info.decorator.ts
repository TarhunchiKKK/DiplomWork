import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { ActivateAccountDto } from "../dto/activate-account.dto";

export const ActivateAccountDtoApiInfo = createEntityApiInfo<ActivateAccountDto>({
    userId: {
        description: "Идентификатор пользователя, которого нужно активировать",
        example: swaggerExampleValues.uuid
    }
});
