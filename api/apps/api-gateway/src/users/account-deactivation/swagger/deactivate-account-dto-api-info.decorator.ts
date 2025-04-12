import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { DeactivateAccountDto } from "../dto/deactivate-account.dto";

export const DeactivateAccountDtoApiInfo = createEntityApiInfo<DeactivateAccountDto>({
    userId: {
        description: "Идентификатор пользователя, которого нужно деактивировать",
        example: swaggerExampleValues.id.uuid
    }
});
