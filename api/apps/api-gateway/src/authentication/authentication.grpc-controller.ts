import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationGrpcService } from "./authentication.grpc-service";
import { IRegisterAdminDto } from "common/grpc";

@Controller("auth")
export class AuthenticationGrpcController {
    public constructor(private readonly authenticationGrpcService: AuthenticationGrpcService) {}

    @Post("/register/admin")
    public registerAdmin(@Body() dto: IRegisterAdminDto) {
        return this.authenticationGrpcService.registerAdmin(dto);
    }
}
