import { IsNotEmpty, IsString } from "class-validator";
import { ICreateWorkflowDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class CreateWorkflowDto implements IgnoreFields<ICreateWorkflowDto, "userId"> {
    @IsNotEmpty({ message: "Идентификатор документа не указан" })
    @IsString({ message: "Идентификатор документа должен быть строкой" })
    public documentId: string;
}
