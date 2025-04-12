import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { EnableTotpDto } from "../dto/enable-totp.dto";

export const EnableTotpDtoApiInfo = createEntityApiInfo<EnableTotpDto>({
    secret: {
        description: "TOTP-секрет (24 символа)",
        example: swaggerExampleValues.totp.secret
    },
    pin: {
        description: "TOTP-код (6 цифр)",
        example: swaggerExampleValues.totp.pin
    }
});
