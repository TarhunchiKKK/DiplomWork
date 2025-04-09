import { IUpdateAdministrativeDivisionsDto } from "common/grpc";
import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import {
    UpdateAdministrativeDivisionsDtoApiInfo,
    UpdateAdministrativeDivisionDtoApiInfo,
    UpdatePostDtoApiInfo
} from "../swagger/update-administrativi-divisions-dto.decorator";

@UpdateAdministrativeDivisionsDtoApiInfo()
export class UpdateAdministrativeDivisionsDto implements IUpdateAdministrativeDivisionsDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    organizationId: string;

    @IsArray({ message: "Ожидается массив административных делений" })
    @ValidateNested({ each: true })
    @Type(() => UpdateAdministrativeDivisionDto)
    administrativeDivisions: UpdateAdministrativeDivisionDto[];
}

@UpdateAdministrativeDivisionDtoApiInfo()
export class UpdateAdministrativeDivisionDto {
    @Optional()
    _id: string;

    @Optional()
    __v: number;

    @IsNotEmpty({ message: "Укажите название админисративного подразделения" })
    @IsString({ message: "Название административного подразделения должно быть строкой" })
    title: string;

    @IsArray({ message: "Ожидается массив должностей" })
    @ValidateNested({ each: true })
    @Type(() => UpdatePostDto)
    posts: UpdatePostDto[];
}

@UpdatePostDtoApiInfo()
export class UpdatePostDto {
    @Optional()
    _id: string;

    @Optional()
    __v: number;

    @IsNotEmpty({ message: "Укажите название должности" })
    @IsString({ message: "Название должности должно быть строкой" })
    title: string;
}
