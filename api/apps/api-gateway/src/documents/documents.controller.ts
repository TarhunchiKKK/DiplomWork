import {
    Body,
    Controller,
    Get,
    ParseBoolPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { DocumentsGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentInfoDto } from "./dto/update-document-info.dto";
import { DocumentSortOrder, DocumentStatus } from "common/enums";

@Controller("/documents")
export class DocumentsController {
    public constructor(private readonly documentsGrpcService: DocumentsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticationGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateDocumentDto) {
        return this.documentsGrpcService.call("create", {
            ...dto,
            authorId: request.jwtInfo.id
        });
    }

    @Patch()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticationGuard)
    public updateInfo(@Req() request: TAuthenticatedRequest, @Body() dto: UpdateDocumentInfoDto) {
        return this.documentsGrpcService.call("updateInfo", {
            ...dto,
            userId: request.jwtInfo.id
        });
    }

    @Get()
    @UseGuards(AuthenticationGuard)
    public findAll(
        @Query("aimId") aimId?: string,
        @Query("typeId") typeId?: string,
        @Query("status") status?: string,
        @Query("isUrgent", ParseBoolPipe) isUrgent?: boolean,
        @Query("sortOrder") sortOrder?: string
    ) {
        return this.documentsGrpcService.call("findAll", {
            aimId,
            typeId,
            status: status as DocumentStatus,
            isUrgent,
            sortOrder: sortOrder as DocumentSortOrder
        });
    }
}
