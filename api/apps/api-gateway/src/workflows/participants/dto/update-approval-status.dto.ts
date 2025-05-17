import { IsNotEmpty, IsString } from "class-validator";
import { IUpdateApprovalStatusDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpdateApprovalStatusDto implements IgnoreFields<IUpdateApprovalStatusDto, "id"> {
    @IsNotEmpty({ message: "Статус должен быть указан" })
    @IsString({ message: "Статус должен быть строкой" })
    public approvalStatus: string;
}
