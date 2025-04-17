import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
    GrpcExceptionFilter,
    ILoginDto,
    InsertGrpcResponseInterceptor,
    IRefreshProfileDto,
    IRegisterAdminDto,
    UnwrapGrpcResponse,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";

type ServiceController = Pick<UsersServiceController, "registerAdmin" | "login" | "refreshProfile">;

@Controller()
@UsersServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
export class AuthController implements UnwrapGrpcResponse<ServiceController> {
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
