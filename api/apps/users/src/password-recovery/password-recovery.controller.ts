import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    WrapGrpcResponseInterceptor,
    IResetPasswordDto,
    IUpdatePasswordDto,
    UnwrapGrpcResponse,
    PasswordRecoveryServiceControllerMethods,
    PasswordRecoveryServiceController
} from "common/grpc";
import { PasswordRecoveryService } from "./password-recovery.service";

@Controller()
@PasswordRecoveryServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class PasswordRecoveryController implements UnwrapGrpcResponse<PasswordRecoveryServiceController> {
    public constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

    public async reset(dto: IResetPasswordDto) {
        await this.passwordRecoveryService.reset(dto.userId);
    }

    public async update(dto: IUpdatePasswordDto) {
        await this.passwordRecoveryService.update(dto);
    }
}
