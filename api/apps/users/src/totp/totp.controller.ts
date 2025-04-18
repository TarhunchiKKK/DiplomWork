import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IDisableTotpDto,
    IEnableTotpDto,
    IGenerateTotpDto,
    ILoginWithTotpDto,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    TotpAuthenticationServiceControllerMethods,
    TotpAuthenticationServiceController
} from "common/grpc";
import { TotpService } from "./totp.service";

@Controller()
@TotpAuthenticationServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class TotpController implements UnwrapGrpcResponse<TotpAuthenticationServiceController> {
    public constructor(private readonly totpService: TotpService) {}

    public async generate(dto: IGenerateTotpDto) {
        return await this.totpService.generate(dto);
    }

    public async enable(dto: IEnableTotpDto) {
        await this.totpService.enable(dto);
    }

    public async disable(dto: IDisableTotpDto) {
        await this.totpService.disable(dto);
    }

    public async login(dto: ILoginWithTotpDto) {
        return await this.totpService.login(dto);
    }
}
