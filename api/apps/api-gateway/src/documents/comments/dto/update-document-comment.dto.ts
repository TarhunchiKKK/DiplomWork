import { IsNotEmpty, IsString } from "class-validator";
import { IUpdateDocumentCommentDto } from "common/grpc";

export class UpdateDocumentCommentDto implements IUpdateDocumentCommentDto {
    @IsNotEmpty({ message: "Id комментария не указан" })
    @IsString({ message: "Id комментария должен быть строкой" })
    public id: string;

    @IsNotEmpty({ message: "Сообщение не указано" })
    @IsString({ message: "Сообщение должно быть строкой" })
    public message: string;
}
