import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateDocumentVersionDto } from "./dto/create-document-version.dto";
import { DocumentVersionsGrpcService } from "common/grpc";

@Controller("/documents/versions")
export class DocumentVersionsController {
    public constructor(private readonly documentVersionsGrpcService: DocumentVersionsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticationGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateDocumentVersionDto) {
        return this.documentVersionsGrpcService.call("create", {
            ...dto,
            userId: request.jwtInfo.id
        });
    }

    @Get(":documentId")
    @UseGuards(AuthenticationGuard)
    public findAll(@Req() request: TAuthenticatedRequest, @Param("documentId") documentId: string) {
        return this.documentVersionsGrpcService.call("findAll", {
            documentId: documentId,
            userId: request.jwtInfo.id
        });
    }
}
