import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ICreateDocumentDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class CreateDocumentDto implements IgnoreFields<ICreateDocumentDto, "authorId"> {
    @IsNotEmpty({ message: "Название документа не указано" })
    @IsString({ message: "Название документа должно быть строкой" })
    public filename: string;

    @IsNotEmpty({ message: "Тип документа не указан" })
    @IsString({ message: "Тип документа должен быть строкой" })
    public typeId: string;

    @IsNotEmpty({ message: "Цель документа не указан" })
    @IsString({ message: "Цель документа должен быть строкой" })
    public aimId: string;

    @IsNotEmpty({ message: "Срочность документа не указана" })
    @IsBoolean({ message: "Срочность документа должна быть булевым значение" })
    public isUrgent: boolean;

    @IsNotEmpty({ message: "Хеш документа не указан" })
    @IsString({ message: "Хеш документа должен быть строкой " })
    public hash: string;
}
