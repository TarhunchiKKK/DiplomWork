import { IsNotEmpty, IsString, Length } from "class-validator";
import { ILoginWithTotpDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class LoginWithTotpDto implements ILoginWithTotpDto {
    @IsNotEmpty({ message: "Пользователь не найден" })
    @IsString({ message: "Пользователь должен быть строкой" })
    userId: string;

    @IsNotEmpty({ message: "Пользователь не найден" })
    @IsString({ message: "Пользователь должен быть строкой" })
    userEmail: string;

    @IsNotEmpty({ message: "TOTP-код не предоставлен" })
    @IsString({ message: "TOTP-код должен быть строкой" })
    @Length(6, 6, { message: "Длина TOTP-кода должна быть 6 символов" })
    public pin: string;
}
