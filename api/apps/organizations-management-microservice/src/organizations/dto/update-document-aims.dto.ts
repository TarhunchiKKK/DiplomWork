import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { IDocumentAim, IUpdateDocumentAimsDto } from "common/grpc";
import { TMongoEntity } from "common/types";

export class UpdateDocumentAimsDto implements IUpdateDocumentAimsDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    organizationId: string;

    @IsArray({ message: "Ожидается массив" })
    documentAims: TMongoEntity<IDocumentAim>[];
}
