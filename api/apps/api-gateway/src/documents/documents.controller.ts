import { Body, Controller, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { DocumentsGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateDocumentDto } from "./dto/create-document.dto";

@Controller("/documents")
export class DocumentsController {
    public constructor(private readonly documentsGrpcService: DocumentsGrpcService) {}

    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticationGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateDocumentDto) {
        return this.documentsGrpcService.call("create", {
            ...dto,
            authorId: request.jwtInfo.id
        });
    }
}
