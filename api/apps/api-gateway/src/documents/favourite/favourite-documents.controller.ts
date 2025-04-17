import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { DocumentsGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { AddToFavouriteDto } from "./dto/add-to-favourite.dto";
import { RemoveFromFavouriteDto } from "./dto/remove-from-favourite.dto";

@Controller("/documents/favourite")
export class FavouriteDocumentsController {
    public constructor(private readonly documentsGrpcService: DocumentsGrpcService) {}

    @Patch("/add")
    @UseGuards(AuthenticationGuard)
    public add(@Req() request: TAuthenticatedRequest, @Body() dto: AddToFavouriteDto) {
        return this.documentsGrpcService.call("addToFavourite", {
            userId: request.jwtInfo.id,
            documentId: dto.documentId
        });
    }

    @Get()
    @UseGuards(AuthenticationGuard)
    public findAll(@Req() request: TAuthenticatedRequest) {
        return this.documentsGrpcService.call("findFavourite", {
            userId: request.jwtInfo.id
        });
    }

    @Patch("/remove")
    @UseGuards(AuthenticationGuard)
    public remove(@Req() request: TAuthenticatedRequest, @Body() dto: RemoveFromFavouriteDto) {
        return this.documentsGrpcService.call("removeFromFavourite", {
            userId: request.jwtInfo.id,
            documentId: dto.documentId
        });
    }
}
