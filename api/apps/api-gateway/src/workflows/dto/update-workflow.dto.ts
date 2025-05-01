import { IsOptional, IsString } from "class-validator";
import { IUpdateWorkflowDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpdateWorkflowDto implements IgnoreFields<IUpdateWorkflowDto, "stautus" | "id"> {
    @IsOptional()
    @IsString({ message: "Название должно быть строкой" })
    public title: string;
}
