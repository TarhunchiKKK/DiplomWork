import { IsNotEmpty, IsString } from "class-validator";
import { ISignWorkflowDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class SignWorkflowDto implements IgnoreFields<ISignWorkflowDto, "documentId"> {
    @IsNotEmpty({ message: "Адрес подписанного документа не указан" })
    @IsString({ message: "Адрес подписанного документа должен быть строкой" })
    public signedDocumentS3Name: string;
}
