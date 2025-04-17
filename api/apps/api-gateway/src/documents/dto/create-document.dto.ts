import { IsNotEmpty, IsString } from "class-validator";
import { ICreateDocumentDto } from "common/grpc";

export class CreateDocumentDto implements Pick<ICreateDocumentDto, "typeId" | "title"> {
    @IsNotEmpty({ message: "Название документа не указано" })
    @IsString({ message: "Название документа должно быть строкой" })
    title: string;

    @IsNotEmpty({ message: "Тип документа не указан" })
    @IsString({ message: "Тип документа должен быть строкой" })
    typeId: string;
}
