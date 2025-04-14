import { IsNotEmpty, IsString, Length } from "class-validator";
import { ILoginWithTotpDto } from "common/grpc";

export class LoginWithTotpDto implements Pick<ILoginWithTotpDto, "pin"> {
    @IsNotEmpty({ message: "TOTP-код не предоставлен" })
    @IsString({ message: "TOTP-код должен быть строкой" })
    @Length(6, 6, { message: "Длина TOTP-кода должна быть 6 символов" })
    public pin: string;
}
