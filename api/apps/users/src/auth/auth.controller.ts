import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
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
export class AuthController implements UnwrapGrpcResponse<AuthenticationServiceController> {
    public constructor(private readonly authService: AuthService) {}

    public async registerAdmin(dto: IRegisterAdminDto) {
        return await this.authService.registerAdmin(dto);
    }

    public async login(dto: ILoginDto) {
        return await this.authService.login(dto);
    }

    public async refreshProfile(dto: IRefreshProfileDto) {
        return await this.authService.refreshProfile(dto);
    }
}
