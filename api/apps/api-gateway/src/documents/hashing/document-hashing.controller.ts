import { Body, Controller, Param, Patch, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { DocumentHashingGrpcService } from "common/grpc";
import { AuthenticationGuard, GatewayExceptionFilter } from "common/middleware";
import { UpdateDocumentHashDto } from "./dto/update-document-hash.dto";
import { VerifyDocumentHashDto } from "./dto/verify-document-hash.dto";

@Controller("/hashing")
@UseFilters(GatewayExceptionFilter)
@UseGuards(AuthenticationGuard)
export class DocumentHashingController {
    public constructor(private readonly hashingGrpcService: DocumentHashingGrpcService) {}

    @Patch(":versionId")
    @UsePipes(ValidationPipe)
    public update(@Param("versionId") versionId: string, @Body() dto: UpdateDocumentHashDto) {
        return this.hashingGrpcService.call("update", {
            versionId: versionId,
            ...dto
        });
    }

    @Post("/verify")
    @UsePipes(ValidationPipe)
    public verify(@Body() dto: VerifyDocumentHashDto) {
        return this.hashingGrpcService.call("verify", dto);
    }
}
