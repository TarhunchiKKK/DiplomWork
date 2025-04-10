import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IConfirmInvitationDto } from "common/grpc";
import { ONE_SPECIAL_CHARACTER_REGEX } from "common/validation";
import { ConfirmInvitationDtoApiInfo } from "../swagger/confirm-invitation-dto-api-info.decorator";

@ConfirmInvitationDtoApiInfo()
export class ConfirmInvitationDto implements Omit<IConfirmInvitationDto, "id"> {
    @IsNotEmpty({ message: "Введите имя пользователя" })
    @IsString({ message: "Имя пользователя должно быть строкой" })
    username: string;

    @IsNotEmpty({ message: "Введите пароль" })
    @IsString({ message: "Пароль должен быть строкой" })
    @MinLength(8, { message: "Пароль должен быть не менее 8 символов" })
    @MaxLength(30, { message: "Пароль не может быть длиннеее 30 символов" })
    @Matches(ONE_SPECIAL_CHARACTER_REGEX, { message: "Пароль должен содержать хотя бы один специальный символ" })
    password: string;
}
