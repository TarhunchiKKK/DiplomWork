import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IEnableTotpDto,
    IGenerateTotpDto,
    ILoginWithTotpDto,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    TotpAuthenticationServiceControllerMethods,
    TotpAuthenticationServiceController,
    IOnlyId
} from "common/grpc";
import { TotpAuthenticationService } from "./totp-authentication.service";

@Controller()
@TotpAuthenticationServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class TotpAuthenticationController implements UnwrapGrpcResponse<TotpAuthenticationServiceController> {
    public constructor(private readonly totpAuthenticationService: TotpAuthenticationService) {}

    public async generate(dto: IGenerateTotpDto) {
        return await this.totpAuthenticationService.generate(dto);
    }

    public async enable(dto: IEnableTotpDto) {
        await this.totpAuthenticationService.enable(dto);
    }

    public async disable(dto: IOnlyId) {
        await this.totpAuthenticationService.disable(dto);
    }

    public async login(dto: ILoginWithTotpDto) {
        return await this.totpAuthenticationService.login(dto);
    }
}
