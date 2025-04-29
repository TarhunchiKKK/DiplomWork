import { IsNotEmpty, IsString } from "class-validator";
import { IUpsertApprovalDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpsertApprovalDto implements IgnoreFields<IUpsertApprovalDto, "workflowId" | "participantId"> {
    @IsNotEmpty({ message: "Статус не указан" })
    @IsString({ message: "Статус должен быть строкой" })
    status: string;
}
