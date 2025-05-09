import { IsOptional, IsString } from "class-validator";
import { IUpdateProfileDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpdateProfileDto implements IgnoreFields<IUpdateProfileDto, "id"> {
    @IsOptional()
    @IsString({ message: "Имя пользователя должно быть строкой" })
    username?: string;
}
