import { IsNotEmpty, IsString } from "class-validator";

export class RemoveFromFavouriteDto implements RemoveFromFavouriteDto {
    @IsNotEmpty({ message: "Идентификатор докуента не указан" })
    @IsString({ message: "Идентификатор документа должен быть строкой" })
    documentId: string;
}
