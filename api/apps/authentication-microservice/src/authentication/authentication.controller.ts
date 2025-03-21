import { Controller } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationServiceController, AuthenticationServiceControllerMethods } from "common/grpc";
import { RegisterAdminDto } from "./dto/register-admin.dto";

@Controller()
@AuthenticationServiceControllerMethods()
export class AuthenticationController implements AuthenticationServiceController {
    public constructor(private readonly authenticationService: AuthenticationService) {}

    public registerAdmin(dto: RegisterAdminDto) {
        return this.authenticationService.registerAdmin(dto);
    }
}
