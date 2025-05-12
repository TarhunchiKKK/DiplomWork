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
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { DocumentSortOrder, Role } from "common/enums";
import { ProvideOperation } from "./middleware/decorators/provide-operation.decorator";
import { DocumentOperation } from "./middleware/enums/document-operation.enum";
import { DocumentOperationGuard } from "./middleware/guards/document-operation.guard";

@Controller("/documents")
@UseGuards(AuthenticationGuard)
export class DocumentsController {
    public constructor(private readonly documentsGrpcService: DocumentsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateDocumentDto) {
        return this.documentsGrpcService.call("create", {
            ...dto,
            authorId: request.jwtInfo.id
        });
    }

    @Get()
    public findAll(
        @Query("aimId") aimId?: string,
        @Query("typeId") typeId?: string,
        @Query("isUrgent", ParseBoolPipe) isUrgent?: boolean,
        @Query("sortOrder") sortOrder?: string
    ) {
        const dto: IFindDocumentsDto = {
            aimId,
            typeId,
            isUrgent,
            sortOrder: sortOrder as DocumentSortOrder | undefined
        };

        return this.documentsGrpcService.call("findAll", dto);
    }

    @Get("my")
    public findMyDocuments(@Req() request: TAuthenticatedRequest) {
        return this.documentsGrpcService.call("findAll", {
            authorId: request.jwtInfo.id
        });
    }

    @Get(":documentId")
    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest(request => request.params.documentId)
    @UseGuards(DocumentOperationGuard)
    public findOneById(@Param("documentId") documentId: string) {
        return this.documentsGrpcService.call("findOneById", {
            id: documentId
        });
    }

    @Patch()
    @UsePipes(ValidationPipe)
    @ProvideOperation(DocumentOperation.UPDATE)
    @ExtractFromRequest(request => request.body.documentId)
    @UseGuards(DocumentOperationGuard)
    public update(@Body() dto: UpdateDocumentDto) {
        return this.documentsGrpcService.call("update", dto);
    }
}
