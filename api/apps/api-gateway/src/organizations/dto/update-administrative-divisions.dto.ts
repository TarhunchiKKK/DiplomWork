import { IUpdateAdministrativeDivisionsDto } from "common/grpc";
import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";

export class UpdateAdministrativeDivisionsDto implements IUpdateAdministrativeDivisionsDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    public organizationId: string;

    @IsArray({ message: "Ожидается массив административных делений" })
    @ValidateNested({ each: true })
    @Type(() => UpdateAdministrativeDivisionDto)
    public administrativeDivisions: UpdateAdministrativeDivisionDto[];
}

export class UpdateAdministrativeDivisionDto {
    @Optional()
    public _id: string;

    @Optional()
    public __v: number;

    @IsNotEmpty({ message: "Укажите название админисративного подразделения" })
    @IsString({ message: "Название административного подразделения должно быть строкой" })
    public title: string;

    @IsArray({ message: "Ожидается массив должностей" })
    @ValidateNested({ each: true })
    @Type(() => UpdatePostDto)
    public posts: UpdatePostDto[];
}

export class UpdatePostDto {
    @Optional()
    public _id: string;

    @Optional()
    public __v: number;

    @IsNotEmpty({ message: "Укажите название должности" })
    @IsString({ message: "Название должности должно быть строкой" })
    public title: string;
}
