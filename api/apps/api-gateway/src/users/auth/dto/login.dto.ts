import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ILoginDto } from "common/grpc";
import { ONE_SPECIAL_CHARACTER_REGEX } from "common/validation";

export class LoginDto implements ILoginDto {
    @IsNotEmpty({ message: "Введите имя пользователя" })
    @IsString({ message: "Имя пользователя должно быть строкой" })
    public login: string;

    @IsNotEmpty({ message: "Введите пароль" })
    @IsString({ message: "Пароль должен быть строкой" })
    @MinLength(8, { message: "Пароль должен быть не менее 8 символов" })
    @MaxLength(30, { message: "Пароль не может быть длиннеее 30 символов" })
    @Matches(ONE_SPECIAL_CHARACTER_REGEX, { message: "Пароль должен содержать хотя бы один специальный символ" })
    public password: string;
}
