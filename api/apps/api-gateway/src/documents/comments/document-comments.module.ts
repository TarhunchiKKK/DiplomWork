import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { DocumentCommentsController } from "./document-comments.controller";

@Module({
    imports: [DocumentsGrpcModule, JwtTokensModule],
    controllers: [DocumentCommentsController]
})
export class DocumentCommentsModule {}
