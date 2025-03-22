import { IUpdateAdministrativeDivisionsDto } from "common/grpc";
import { TMongoEntity } from "common/types";
import { AdministrativeDivision } from "../schemas/administrative-division.schema";
import { IsNotEmpty, IsString, IsArray } from "class-validator";
import { Post } from "../schemas/post.schema";

export class UpdateAdministrativeDivisionsDto implements IUpdateAdministrativeDivisionsDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    organizationId: string;

    @IsArray({ message: "Ожидается массив" })
    administrativeDivisions: TMongoEntity<AdministrativeDivision & { posts: TMongoEntity<Post>[] }>[];
}
