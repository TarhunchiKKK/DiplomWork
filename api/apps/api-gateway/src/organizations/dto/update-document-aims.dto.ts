import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { IUpdateDocumentAimsDto } from "common/grpc";

export class UpdateDocumentAimsDto implements IUpdateDocumentAimsDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    organizationId: string;

    @IsArray({ message: "Ожидается массив" })
    @ValidateNested({ each: true })
    @Type(() => UpdateDocumentAimDto)
    documentAims: UpdateDocumentAimDto[];
}

export class UpdateDocumentAimDto {
    @IsOptional()
    _id: string;

    @Optional()
    __v: number;

    @IsNotEmpty({ message: "Укажите значение цели документа" })
    @IsString({ message: "Значение цели документа должно быть строкой" })
    value: string;
}
