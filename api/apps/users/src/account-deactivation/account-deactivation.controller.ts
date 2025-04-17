import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IActivateAccountDto,
    IDeactivateAccountDto,
    InsertGrpcResponseInterceptor,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { AccountDeactivationService } from "./account-deactivation.service";
import { UnknownReturnTypes } from "common/utils";

type ServiceController = Pick<UsersServiceController, "activateAccount" | "deactivateAccount">;

@Controller()
@UsersServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
export class AccountDeactivationController implements UnknownReturnTypes<ServiceController> {
    public constructor(private readonly accountDeactivationService: AccountDeactivationService) {}

    public async activateAccount(dto: IActivateAccountDto) {
        await this.accountDeactivationService.activateAccount(dto);
    }

    public async deactivateAccount(dto: IDeactivateAccountDto) {
        await this.accountDeactivationService.deactivateAccount(dto);
    }
}
