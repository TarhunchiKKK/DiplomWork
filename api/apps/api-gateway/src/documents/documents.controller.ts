import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { DocumentsGrpcService, IFindDocumentsDto } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest, GatewayExceptionFilter } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { DocumentSortOrder, Role } from "common/enums";
import { ProvideOperation } from "./middleware/decorators/provide-operation.decorator";
import { DocumentOperation } from "./middleware/enums/document-operation.enum";
import { DocumentOperationGuard } from "./middleware/guards/document-operation.guard";

@Controller("/documents")
@UseFilters(GatewayExceptionFilter)
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
        @Req() request: TAuthenticatedRequest,
        @Query("aimId") aimId?: string,
        @Query("typeId") typeId?: string,
        @Query("isUrgent") isUrgent?: string,
        @Query("sortOrder") sortOrder?: string
    ) {
        const dto: IFindDocumentsDto = {
            authorId: request.jwtInfo.id,
            aimId,
            typeId,
            isUrgent: isUrgent === undefined ? undefined : Boolean(isUrgent),
            sortOrder: sortOrder as DocumentSortOrder | undefined
        };

        return this.documentsGrpcService.call("findAll", dto);
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
    @ExtractFromRequest(request => request.body.id)
    @UseGuards(DocumentOperationGuard)
    public update(@Body() dto: UpdateDocumentDto) {
        return this.documentsGrpcService.call("update", dto);
    }
}
