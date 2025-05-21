import { IsNotEmpty, IsString } from "class-validator";
import { IChangeAccountStatusDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class ChangeAccountStatusDto implements IgnoreFields<IChangeAccountStatusDto, "id"> {
    @IsNotEmpty({ message: "Новый статус не указан" })
    @IsString({ message: "Статус должен быть строкой" })
    public status: string;
}
