import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { AuthenticationGuard, GatewayExceptionFilter } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { FavouriteDocumentsGrpcService } from "common/grpc";

@Controller("/favourite")
@UseFilters(GatewayExceptionFilter)
@UseGuards(AuthenticationGuard)
export class FavouriteDocumentsController {
    public constructor(private readonly favouriteDocumentsGrpcService: FavouriteDocumentsGrpcService) {}

    @Post(":documentId")
    public add(@Req() request: TAuthenticatedRequest, @Param("documentId") documentId: string) {
        return this.favouriteDocumentsGrpcService.call("add", {
            userId: request.jwtInfo.id,
            documentId: documentId
        });
    }

    @Get()
    public findAll(@Req() request: TAuthenticatedRequest) {
        return this.favouriteDocumentsGrpcService.call("findAll", {
            id: request.jwtInfo.id
        });
    }

    @Delete(":documentId")
    @UsePipes(ValidationPipe)
    public remove(@Req() request: TAuthenticatedRequest, @Param("documentId") documentId: string) {
        return this.favouriteDocumentsGrpcService.call("remove", {
            userId: request.jwtInfo.id,
            documentId: documentId
        });
    }
}
