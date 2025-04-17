import { IsNotEmpty, IsString, Length } from "class-validator";
import { IEnableTotpDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class EnableTotpDto implements IgnoreFields<IEnableTotpDto, "userId" | "userEmail"> {
    @IsNotEmpty({ message: "TOTP-секрет не предоставлен" })
    @IsString({ message: "TOTP-секрет должен быть строкой" })
    public secret: string;

    @IsNotEmpty({ message: "TOTP-код не предоставлен" })
    @IsString({ message: "TOTP-код должен быть строкой" })
    @Length(6, 6, { message: "Длина TOTP-кода должна быть 6 символов" })
    public pin: string;
}
