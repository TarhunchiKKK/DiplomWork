import { Controller, Get } from "@nestjs/common";

@Controller()
export class ApigatewayController {
    @Get()
    public hello() {
        return "Hello";
    }
}
