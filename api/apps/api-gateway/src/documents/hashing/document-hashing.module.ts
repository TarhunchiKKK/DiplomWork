import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { DocumentHashingController } from "./document-hashing.controller";

@Module({
    imports: [DocumentsGrpcModule, JwtTokensModule],
    controllers: [DocumentHashingController]
})
export class DocumentHashingModule {}
