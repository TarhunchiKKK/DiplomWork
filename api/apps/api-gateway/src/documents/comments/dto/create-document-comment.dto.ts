import { IsNotEmpty, IsString } from "class-validator";
import { ICreateDocumentCommentDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class CreateDocumentCommentDto implements IgnoreFields<ICreateDocumentCommentDto, "creatorId"> {
    @IsNotEmpty({ message: "Сообщение не указано" })
    @IsString({ message: "Сообщение должно быть строкой" })
    public message: string;

    @IsNotEmpty({ message: "Версия документа не указана" })
    @IsString({ message: "Версия документа должна быть строкой" })
    public versionId: string;
}
