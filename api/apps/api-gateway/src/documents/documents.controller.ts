import {
    Body,
    Controller,
    Get,
    Param,
    ParseBoolPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { DocumentsGrpcService, IFindDocumentsDto } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { DocumentSortOrder, DocumentStatus, Role } from "common/enums";

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

    @Get()
    @UseGuards(AuthenticationGuard)
    public findAll(
        @Req() request: TAuthenticatedRequest,
        @Query("aimId") aimId?: string,
        @Query("typeId") typeId?: string,
        @Query("status") status?: string,
        @Query("isUrgent", ParseBoolPipe) isUrgent?: boolean,
        @Query("sortOrder") sortOrder?: string
    ) {
        const dto: IFindDocumentsDto = {
            aimId,
            typeId,
            status: status as DocumentStatus,
            isUrgent,
            sortOrder: sortOrder as DocumentSortOrder
        };

        if (request.jwtInfo.role !== Role.ADMIN) {
            dto.authorId = request.jwtInfo.id;
        }

        return this.documentsGrpcService.call("findAll", dto);
    }

    @Get(":documentId")
    @UseGuards(AuthenticationGuard)
    public findOneById(@Req() request: TAuthenticatedRequest, @Param("documentId") documentId: string) {
        return this.documentsGrpcService.call("findOneById", {
            documentId: documentId,
            userId: request.jwtInfo.id
        });
    }

    @Patch()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticationGuard)
    public updateInfo(@Req() request: TAuthenticatedRequest, @Body() dto: UpdateDocumentDto) {
        return this.documentsGrpcService.call("update", {
            ...dto,
            userId: request.jwtInfo.id
        });
    }
}
