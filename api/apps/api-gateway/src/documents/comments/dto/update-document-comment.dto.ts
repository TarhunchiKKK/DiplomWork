import { IsNotEmpty, IsString } from "class-validator";
import { IUpdateDocumentCommentDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpdateDocumentCommentDto implements IgnoreFields<IUpdateDocumentCommentDto, "userId"> {
    @IsNotEmpty({ message: "Id комментария не указан" })
    @IsString({ message: "Id комментария должен быть строкой" })
    public id: string;

    @IsNotEmpty({ message: "Сообщение не указано" })
    @IsString({ message: "Сообщение должно быть строкой" })
    public message: string;
}
