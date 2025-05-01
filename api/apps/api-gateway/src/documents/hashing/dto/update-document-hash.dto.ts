import { IsNotEmpty, IsString } from "class-validator";
import { IUpdateDocumentHashDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpdateDocumentHashDto implements IgnoreFields<IUpdateDocumentHashDto, "versionId"> {
    @IsNotEmpty({ message: "Хеш документа не указан" })
    @IsString({ message: "Хеш документа должен быть строкой " })
    public hash: string;

    @IsNotEmpty({ message: "Подпись хеша е указан" })
    @IsString({ message: "Подпись хеша олжна быть строкой " })
    public sign: string;
}
