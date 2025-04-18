import { Body, Controller, Delete, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { AddToFavouriteDto } from "./dto/add-to-favourite.dto";
import { RemoveFromFavouriteDto } from "./dto/remove-from-favourite.dto";
import { FavouriteDocumentsGrpcService } from "common/grpc";

@Controller("/documents/favourite")
export class FavouriteDocumentsController {
    public constructor(private readonly favouriteDocumentsGrpcService: FavouriteDocumentsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticationGuard)
    public add(@Req() request: TAuthenticatedRequest, @Body() dto: AddToFavouriteDto) {
        return this.favouriteDocumentsGrpcService.call("add", {
            userId: request.jwtInfo.id,
            documentId: dto.documentId
        });
    }

    @Get()
    @UseGuards(AuthenticationGuard)
    public findAll(@Req() request: TAuthenticatedRequest) {
        return this.favouriteDocumentsGrpcService.call("findAll", {
            userId: request.jwtInfo.id
        });
    }

    @Delete()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticationGuard)
    public remove(@Req() request: TAuthenticatedRequest, @Body() dto: RemoveFromFavouriteDto) {
        return this.favouriteDocumentsGrpcService.call("remove", {
            userId: request.jwtInfo.id,
            documentId: dto.documentId
        });
    }
}
