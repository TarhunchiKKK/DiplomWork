import { Controller } from "@nestjs/common";
import { AuthenticationService } from "./services/authentication.service";
import { RegisterAdminDto } from "common/grpc";
import { GrpcMethod } from "@nestjs/microservices";
import { SERVICE_NAME } from "./constants";

@Controller()
export class AuthenticationController {
    public constructor(private readonly authenticationService: AuthenticationService) {}

    @GrpcMethod(SERVICE_NAME, "RegisterAdmin")
    public registerAdmin(dto: RegisterAdminDto) {
        return this.authenticationService.registerAdmin(dto);
    }
}
