import { Controller, Get, UseFilters } from "@nestjs/common";
import { GatewayExceptionFilter } from "common/middleware";

@Controller()
@UseFilters(GatewayExceptionFilter)
export class AppController {
    @Get("/ping")
    public ping() {
        return "Pong";
    }
}
