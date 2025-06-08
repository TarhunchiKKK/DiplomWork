import { IsNotEmpty, IsString } from "class-validator";
import { IUpdateSignerDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpdateSignerDto implements IgnoreFields<IUpdateSignerDto, "workflowId"> {
    @IsNotEmpty({ message: "Идентификатор подписывающего не указан" })
    @IsString({ message: "Идентификатор подписывающего должен быть строкой" })
    signerId: string;
}
