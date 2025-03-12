import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticationGrpcService } from "./services";

@Controller()
export class ApiGatewayController {
    public constructor(private readonly authenticationGrpcService: AuthenticationGrpcService) {}

    @Get()
    public hello() {
        return "Hello World!";
    }

    @Post("/auth/register/admin")
    public registerAdmin(@Body() dto) {
        return this.authenticationGrpcService.registerAdmin(dto);
    }
}
