import { IUpdateDocumentTypesDto } from "common/grpc";
import { DocumentType } from "../schemas/document-type.schema";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { TMongoEntity } from "common/types";

export class UpdateDocumentTypesDto implements IUpdateDocumentTypesDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    organizationId: string;

    @IsArray({ message: "Ожидается массив" })
    documentTypes: TMongoEntity<DocumentType>[];
}
