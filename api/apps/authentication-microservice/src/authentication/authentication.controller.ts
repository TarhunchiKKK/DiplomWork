import { Controller } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import {
    AuthenticationServiceController,
    AuthenticationServiceControllerMethods,
    IRegisterAdminDto
} from "common/grpc";

@Controller()
@AuthenticationServiceControllerMethods()
export class AuthenticationController implements AuthenticationServiceController {
    public constructor(private readonly authenticationService: AuthenticationService) {}

    public registerAdmin(dto: IRegisterAdminDto) {
        return this.authenticationService.registerAdmin(dto);
    }
}
