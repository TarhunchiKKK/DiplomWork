import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { EMAIL_REGEX, ONE_SPECIAL_CHARACTER_REGEX } from "common/validation";
import { IRegisterAdminDto } from "common/grpc";

export class RegisterAdminDto implements IRegisterAdminDto {
    @IsNotEmpty({ message: "Введите имя пользователя" })
    @IsString({ message: "Имя пользователя должно быть строкой" })
    username: string;

    @IsNotEmpty({ message: "Введите email" })
    @Matches(EMAIL_REGEX, { message: "Некорректный формат email" })
    email: string;

    @IsNotEmpty({ message: "Введите пароль" })
    @IsString({ message: "Пароль должен быть строкой" })
    @MinLength(8, { message: "Пароль должен быть не менее 8 символов" })
    @MaxLength(30, { message: "Пароль не может быть длиннеее 30 символов" })
    @Matches(ONE_SPECIAL_CHARACTER_REGEX, { message: "Пароль должен содержать хотя бы один специальный символ" })
    password: string;
}
