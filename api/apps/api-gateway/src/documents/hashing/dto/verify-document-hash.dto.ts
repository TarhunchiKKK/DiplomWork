import { IsNotEmpty, IsString } from "class-validator";
import { IVerifyDocumentHashDto } from "common/grpc";

export class VerifyDocumentHashDto implements IVerifyDocumentHashDto {
    @IsNotEmpty({ message: "Хеш документа не указан" })
    @IsString({ message: "Хеш документа должен быть строкой " })
    public hash: string;

    @IsNotEmpty({ message: "Подпись хеша е указан" })
    @IsString({ message: "Подпись хеша олжна быть строкой " })
    public sign: string;
}
