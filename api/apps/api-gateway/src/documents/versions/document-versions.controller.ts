import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { AuthenticationGuard, ExtractFromRequest, GatewayExceptionFilter } from "common/middleware";
import { CreateDocumentVersionDto } from "./dto/create-document-version.dto";
import { DocumentVersionsGrpcService, WorkflowsGrpcService } from "common/grpc";
import { ProvideOperation } from "../middleware/decorators/provide-operation.decorator";
import { DocumentOperation } from "../middleware/enums/document-operation.enum";
import { VersionOperationGuard } from "../middleware/guards/version-operation.guard";
import { UpdateDocumentVersionDto } from "./dto/update-document-version.dto";
import { DocumentOperationGuard } from "../middleware/guards/document-operation.guard";
import { firstValueFrom } from "rxjs";

@Controller("/versions")
@UseFilters(GatewayExceptionFilter)
@UseGuards(AuthenticationGuard)
export class DocumentVersionsController {
    public constructor(
        private readonly documentVersionsGrpcService: DocumentVersionsGrpcService,

        private readonly workflowsGrpcService: WorkflowsGrpcService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ProvideOperation(DocumentOperation.CREATE_VERSION)
    @ExtractFromRequest(request => request.body.documentId)
    @UseGuards(DocumentOperationGuard)
    public create(@Body() dto: CreateDocumentVersionDto) {
        return Promise.allSettled([
            firstValueFrom(this.documentVersionsGrpcService.call("create", dto)),

            firstValueFrom(
                this.workflowsGrpcService.call("start", {
                    id: dto.documentId
                })
            )
        ]);
    }

    @Get("/all/:documentId")
    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest(request => request.params.documentId)
    @UseGuards(DocumentOperationGuard)
    public findAll(@Param("documentId") documentId: string) {
        return this.documentVersionsGrpcService.call("findAll", {
            id: documentId
        });
    }

    @Get("/:versionId")
    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest(request => request.params.versionId)
    @UseGuards(VersionOperationGuard)
    public findOneById(@Param("versionId") versionId: string) {
        return this.documentVersionsGrpcService.call("findOneById", {
            id: versionId
        });
    }

    @Patch(":versionId")
    @UsePipes(ValidationPipe)
    @ProvideOperation(DocumentOperation.UPDATE_VERSION)
    @ExtractFromRequest(request => request.params.versionId)
    @UseGuards(DocumentOperationGuard)
    public update(@Param("versionId") versionId: string, @Body() dto: UpdateDocumentVersionDto) {
        return this.documentVersionsGrpcService.call("update", {
            ...dto,
            id: versionId
        });
    }
}
