import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { AuthenticationService } from "./authentiation.service";
import {
    GrpcExceptionFilter,
    ILoginDto,
    WrapGrpcResponseInterceptor,
    IRefreshProfileDto,
    IRegisterAdminDto,
    UnwrapGrpcResponse,
    AuthenticationServiceControllerMethods,
    AuthenticationServiceController
} from "common/grpc";

@Controller()
@AuthenticationServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class AuthenticationController implements UnwrapGrpcResponse<AuthenticationServiceController> {
    public constructor(private readonly authenticationService: AuthenticationService) {}

    public async registerAdmin(dto: IRegisterAdminDto) {
        return await this.authenticationService.registerAdmin(dto);
    }

    public async login(dto: ILoginDto) {
        return await this.authenticationService.login(dto);
    }

    public async refreshProfile(dto: IRefreshProfileDto) {
        return await this.authenticationService.refreshProfile(dto);
    }
}
