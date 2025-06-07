import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ICreateDocumentVersionDto } from "common/grpc";

export class CreateDocumentVersionDto implements ICreateDocumentVersionDto {
    @IsNotEmpty({ message: "Идентификатор документа не указан" })
    @IsString({ message: "Идентификатор документа должен быть строкой" })
    public documentId: string;

    @IsNotEmpty({ message: "Расширение файла не указано" })
    @IsString({ message: "Расширение файла должно быть строкой" })
    public s3Name: string;

    @IsOptional()
    @IsString({ message: "Описание к версии должно быть строкой" })
    public description?: string;

    @IsNotEmpty({ message: "Хеш документа не указан" })
    @IsString({ message: "Хеш документа должен быть строкой" })
    public hash: string;
}
