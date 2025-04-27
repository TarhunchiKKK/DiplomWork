import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IOnlyId,
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

    public async activate(dto: IOnlyId) {
        await this.accountDeactivationService.activate(dto.id);
    }

    public async deactivate(dto: IOnlyId) {
        await this.accountDeactivationService.deactivate(dto.id);
    }
}
