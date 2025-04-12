import { IsNotEmpty, IsString, Length } from "class-validator";
import { IEnableTotpDto } from "common/grpc";
import { EnableTotpDtoApiInfo } from "../swagger/enable-totp-dto-api-info.decorator";

@EnableTotpDtoApiInfo()
export class EnableTotpDto implements Pick<IEnableTotpDto, "secret" | "pin"> {
    @IsNotEmpty({ message: "TOTP-секрет не предоставлен" })
    @IsString({ message: "TOTP-секрет должен быть строкой" })
    secret: string;

    @IsNotEmpty({ message: "TOTP-код не предоставлен" })
    @IsString({ message: "TOTP-код должен быть строкой" })
    @Length(6, 6, { message: "Длина TOTP-кода должна быть 6 символов" })
    pin: string;
}
