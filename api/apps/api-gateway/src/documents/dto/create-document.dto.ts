import { IsNotEmpty, IsString } from "class-validator";
import { ICreateDocumentDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class CreateDocumentDto implements IgnoreFields<ICreateDocumentDto, "authorId"> {
    @IsNotEmpty({ message: "Название документа не указано" })
    @IsString({ message: "Название документа должно быть строкой" })
    title: string;

    @IsNotEmpty({ message: "Тип документа не указан" })
    @IsString({ message: "Тип документа должен быть строкой" })
    typeId: string;

    @IsNotEmpty({ message: "Цель документа не указан" })
    @IsString({ message: "Цель документа должен быть строкой" })
    aimId: string;
}
