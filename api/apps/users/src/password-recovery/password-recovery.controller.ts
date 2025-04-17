import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    InsertGrpcResponseInterceptor,
    IResetPasswordDto,
    IUpdatePasswordDto,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { PasswordRecoveryService } from "./password-recovery.service";
import { UnknownReturnTypes } from "common/utils";

type ServiceController = Pick<UsersServiceController, "resetPassword" | "updatePassword">;

@Controller()
@UsersServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
export class PasswordRecoveryController implements UnknownReturnTypes<ServiceController> {
    public constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

    public async resetPassword(dto: IResetPasswordDto) {
        await this.passwordRecoveryService.reset(dto.userId);
    }

    public async updatePassword(dto: IUpdatePasswordDto) {
        await this.passwordRecoveryService.update(dto);
    }
}
