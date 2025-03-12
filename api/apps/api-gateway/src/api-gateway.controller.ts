import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterAdminDto } from "common/grpc";
import { AuthenticationGrpcService } from "./services/authentication.grpc-service";

@Controller()
export class ApiGatewayController {
    public constructor(private readonly authenticationGrpcService: AuthenticationGrpcService) {}

    @Get()
    public hello() {
        return "Hello World!";
    }

    @Post("/auth/register/admin")
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.authenticationGrpcService.registerAdmin(dto);
    }
}
