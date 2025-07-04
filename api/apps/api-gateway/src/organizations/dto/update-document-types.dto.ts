import { IUpdateDocumentTypesDto } from "common/grpc";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";

export class UpdateDocumentTypesDto implements IUpdateDocumentTypesDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    public organizationId: string;

    @IsArray({ message: "Ожидается массив" })
    @ValidateNested({ each: true })
    @Type(() => UpdateDocumentTypeDto)
    public documentTypes: UpdateDocumentTypeDto[];
}

export class UpdateDocumentTypeDto {
    @Optional()
    public _id: string;

    @Optional()
    public __v: number;

    @IsNotEmpty({ message: "Укажите значение документного типа" })
    @IsString({ message: "Значение документного типа должно быть строкой" })
    public value: string;
}
