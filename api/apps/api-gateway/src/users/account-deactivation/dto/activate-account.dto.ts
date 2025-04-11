import { IsNotEmpty, IsString } from "class-validator";
import { IActivateAccountDto } from "common/grpc";
import { ActivateAccountDtoApiInfo } from "../swagger/activate-account-dto-api-info.decorator";

@ActivateAccountDtoApiInfo()
export class ActivateAccountDto implements IActivateAccountDto {
    @IsNotEmpty({ message: "Не найден идентификатор пользователя" })
    @IsString({ message: "Идентификато пользователя должен быть строкой" })
    userId: string;
}
