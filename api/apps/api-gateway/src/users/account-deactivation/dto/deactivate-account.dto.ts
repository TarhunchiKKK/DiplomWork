import { IsNotEmpty, IsString } from "class-validator";
import { IDeactivateAccountDto } from "common/grpc";

export class DeactivateAccountDto implements IDeactivateAccountDto {
    @IsNotEmpty({ message: "Не найден идентификатор пользователя" })
    @IsString({ message: "Идентификато пользователя должен быть строкой" })
    public userId: string;
}
