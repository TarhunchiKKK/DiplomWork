import { Controller } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { UsersServiceController, UsersServiceControllerMethods } from "common/grpc";
import { RegisterAdminDto } from "./dto/register-admin.dto";

@Controller()
@UsersServiceControllerMethods()
export class AuthenticationController implements Partial<UsersServiceController> {
    public constructor(private readonly authenticationService: AuthenticationService) {}

    public registerAdmin(dto: RegisterAdminDto) {
        return this.authenticationService.registerAdmin(dto);
    }
}
