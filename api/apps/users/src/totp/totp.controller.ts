import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IDisableTotpDto,
    IEnableTotpDto,
    IGenerateTotpDto,
    ILoginWithTotpDto,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { TotpService } from "./totp.service";

type ServiceController = Pick<UsersServiceController, "generateTotp" | "enableTotp" | "disableTotp" | "loginWithTotp">;

@Controller()
@UsersServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class TotpController implements UnwrapGrpcResponse<ServiceController> {
    public constructor(private readonly totpService: TotpService) {}

    public async generateTotp(dto: IGenerateTotpDto) {
        return await this.totpService.generate(dto);
    }

    public async enableTotp(dto: IEnableTotpDto) {
        await this.totpService.enable(dto);
    }

    public async disableTotp(dto: IDisableTotpDto) {
        await this.totpService.disable(dto);
    }

    public async loginWithTotp(dto: ILoginWithTotpDto) {
        return await this.totpService.login(dto);
    }
}
