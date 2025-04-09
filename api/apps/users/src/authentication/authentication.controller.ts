import { Controller } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { IRegisterAdminDto, UsersServiceController, UsersServiceControllerMethods } from "common/grpc";

@Controller()
@UsersServiceControllerMethods()
export class AuthenticationController implements Partial<UsersServiceController> {
    public constructor(private readonly authenticationService: AuthenticationService) {}

    public registerAdmin(dto: IRegisterAdminDto) {
        return this.authenticationService.registerAdmin(dto);
    }
}
