import { IsNotEmpty, IsString } from "class-validator";
import { IActivateAccountDto } from "common/grpc";

export class ActivateAccountDto implements IActivateAccountDto {
    @IsNotEmpty({ message: "Не найден идентификатор пользователя" })
    @IsString({ message: "Идентификато пользователя должен быть строкой" })
    public userId: string;
}
