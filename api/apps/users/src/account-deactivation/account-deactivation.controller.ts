import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { AccountDeactivationService } from "./account-deactivation.service";
import {
    GrpcExceptionFilter,
    IOnlyId,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    AccountDeactivationServiceController,
    AccountDeactivationServiceControllerMethods,
    IChangeAccountStatusDto
} from "common/grpc";

@Controller()
@AccountDeactivationServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class AccountDeactivationController implements UnwrapGrpcResponse<AccountDeactivationServiceController> {
    public constructor(private readonly accountDeactivationService: AccountDeactivationService) {}

    public async changeStatus(dto: IChangeAccountStatusDto) {
        await this.accountDeactivationService.changeStatus(dto);
    }
}
