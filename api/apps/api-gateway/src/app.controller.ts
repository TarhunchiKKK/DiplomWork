import { Controller, Get, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiTemporaryRedirectResponse } from "@nestjs/swagger";

@Controller()
@ApiTags("Docs")
export class AppController {
    @Get()
    @ApiOperation({ summary: "Swagger" })
    @ApiTemporaryRedirectResponse()
    public swagger(@Res() response) {
        response.status(302).redirect("/api");
    }

    @Get("/hello")
    @ApiOperation({ summary: "API Gateway pinging" })
    @ApiResponse({ example: "Hello" })
    public hello() {
        return "Hello";
    }
}
