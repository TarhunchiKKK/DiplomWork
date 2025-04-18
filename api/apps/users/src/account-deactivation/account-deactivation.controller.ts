import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IActivateAccountDto,
    IDeactivateAccountDto,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    AccountDeactivationServiceController,
    AccountDeactivationServiceControllerMethods
} from "common/grpc";
import { AccountDeactivationService } from "./account-deactivation.service";

@Controller()
@AccountDeactivationServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class AccountDeactivationController implements UnwrapGrpcResponse<AccountDeactivationServiceController> {
    public constructor(private readonly accountDeactivationService: AccountDeactivationService) {}

    public async activate(dto: IActivateAccountDto) {
        await this.accountDeactivationService.activate(dto);
    }

    public async deactivate(dto: IDeactivateAccountDto) {
        await this.accountDeactivationService.deactivate(dto);
    }
}
