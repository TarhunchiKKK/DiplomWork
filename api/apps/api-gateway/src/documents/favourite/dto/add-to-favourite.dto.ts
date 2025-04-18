import { IsNotEmpty, IsString } from "class-validator";
import { IAddToFavouriteDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class AddToFavouriteDto implements IgnoreFields<IAddToFavouriteDto, "userId"> {
    @IsNotEmpty({ message: "Идентификатор докуента не указан" })
    @IsString({ message: "Идентификатор документа должен быть строкой" })
    public documentId: string;
}
