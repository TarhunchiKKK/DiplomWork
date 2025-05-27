import { IsNotEmpty, IsString } from "class-validator";
import { ICreateWorkflowDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class CreateWorkflowDto implements IgnoreFields<ICreateWorkflowDto, "creatorId"> {
    @IsNotEmpty({ message: "Идентификатор документа не указан" })
    @IsString({ message: "Идентификатор документа должен быть строкой" })
    public documentId: string;

    @IsNotEmpty({ message: "Название не указано" })
    @IsString({ message: "Название должно быть строкой" })
    public documentTitle: string;
}
