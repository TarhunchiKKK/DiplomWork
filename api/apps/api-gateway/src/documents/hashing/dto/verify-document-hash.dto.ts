import { IsNotEmpty, IsString } from "class-validator";
import { IVerifyDocumentHashDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class VerifyDocumentHashDto implements IgnoreFields<IVerifyDocumentHashDto, "versionId"> {
    @IsNotEmpty({ message: "Хеш документа не указан" })
    @IsString({ message: "Хеш документа должен быть строкой " })
    public hash: string;
}
