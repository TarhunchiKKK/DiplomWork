import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { LoginWithTotpDto } from "../dto/login-with-totp.dto";

export const LoginWithTotpDtoApiInfo = createEntityApiInfo<LoginWithTotpDto>({
    pin: {
        description: "TOTP-код (6 цифр)",
        example: swaggerExampleValues.totp.pin
    }
});
