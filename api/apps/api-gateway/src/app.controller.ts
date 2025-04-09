import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("Root")
export class AppController {
    @Get()
    @ApiOperation({ summary: 'Возвращает строку "Hello"' })
    @ApiResponse({ status: 200, example: "Hello" })
    public hello() {
        return "Hello";
    }
}
