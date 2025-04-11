import { IsNotEmpty, IsString } from "class-validator";
import { IDeactivateAccountDto } from "common/grpc";
import { DeactivateAccountDtoApiInfo } from "../swagger/deactivate-account-dto-api-info.decorator";

@DeactivateAccountDtoApiInfo()
export class DeactivateAccountDto implements IDeactivateAccountDto {
    @IsNotEmpty({ message: "Не найден идентификатор пользователя" })
    @IsString({ message: "Идентификато пользователя должен быть строкой" })
    userId: string;
}
