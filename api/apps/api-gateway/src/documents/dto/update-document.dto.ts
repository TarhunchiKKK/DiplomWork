import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IUpdateDocumentDto } from "common/grpc";

export class UpdateDocumentDto implements IUpdateDocumentDto {
    @IsNotEmpty({ message: "Идентификатор документа не указан" })
    @IsString({ message: "Идентификатор документа должен быть строкой" })
    public documentId: string;

    @IsOptional()
    @IsString({ message: "Название документа должно быть строкой" })
    public title?: string;

    @IsOptional()
    @IsString({ message: "Идентификатор типа документа должен быть строкой" })
    public typeId?: string;

    @IsOptional()
    @IsString({ message: "Идентификатор цели документа должен быть строкой" })
    public aimId?: string;

    @IsOptional()
    @IsBoolean({ message: "Срочность выполнения документа должна быть логическим значением" })
    public isUrgent?: boolean;
}
