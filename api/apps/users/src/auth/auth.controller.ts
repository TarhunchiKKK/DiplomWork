import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
    ILoginDto,
    IRefreshProfileDto,
    IRegisterAdminDto,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { UnknownReturnTypes } from "common/utils";

type ServiceController = Pick<UsersServiceController, "registerAdmin" | "login" | "refreshProfile">;

@Controller()
@UsersServiceControllerMethods()
export class AuthController implements UnknownReturnTypes<ServiceController> {
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
