import { IsOptional, IsString } from "class-validator";
import { IUpdateDocumentVersionDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpdateDocumentVersionDto implements IgnoreFields<IUpdateDocumentVersionDto, "id"> {
    @IsOptional()
    @IsString({ message: "Описание верси должно быть строкой" })
    public description?: string;
}
