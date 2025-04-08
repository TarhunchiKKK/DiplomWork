import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, Matches } from "class-validator";
import { EMAIL_REGEX } from "common/validation";
import { IInviteUsersDto } from "common/grpc";

export class InviteUsersDto implements IInviteUsersDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    public organizationId: string;

    @IsNotEmpty({ message: "Email администратора не предоставлен" })
    @Matches(EMAIL_REGEX, { message: "Некорректный формат email" })
    public adminEmail: string;

    @IsArray({ message: "Ожидается массив email'ов" })
    @Type(() => String)
    public emails: string[];
}
