import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ICreateDocumentVersionDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class CreateDocumentVersionDto implements IgnoreFields<ICreateDocumentVersionDto, "userId"> {
    @IsNotEmpty({ message: "Идентификатор документа не указан" })
    @IsString({ message: "Идентификатор документа должен быть строкой" })
    public documentId: string;

    @IsNotEmpty({ message: "Расширение файла не указано" })
    @IsString({ message: "Расширение файла должно быть строкой" })
    public fileExtension: string;

    @IsOptional()
    @IsString({ message: "Описание к версии должно быть строкой" })
    public description?: string;
}
