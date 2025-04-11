import { Controller } from "@nestjs/common";
import {
    IActivateAccountDto,
    IDeactivateAccountDto,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { AccountDeactivationService } from "./account-deactivation.service";

type ServiceController = Pick<UsersServiceController, "activateAccount" | "deactivateAccount">;

@Controller()
@UsersServiceControllerMethods()
export class AccountDeactivationController implements ServiceController {
    public constructor(private readonly accountDeactivationService: AccountDeactivationService) {}

    public async activateAccount(dto: IActivateAccountDto) {
        await this.accountDeactivationService.activateAccount(dto);
    }

    public async deactivateAccount(dto: IDeactivateAccountDto) {
        await this.accountDeactivationService.deactivateAccount(dto);
    }
}
