import { Controller } from "@nestjs/common";
import { IResetPasswordDto, UsersServiceController, UsersServiceControllerMethods } from "common/grpc";
import { PasswordRecoveryService } from "./password-recovery.service";

type ServiceController = Pick<UsersServiceController, "resetPassword">;

@Controller()
@UsersServiceControllerMethods()
export class PasswordRecoveryController implements ServiceController {
    public constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

    public async resetPassword(dto: IResetPasswordDto) {
        await this.passwordRecoveryService.reset(dto.userId);
    }
}
