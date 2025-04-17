import { Controller, Post } from "@nestjs/common";
import { DocumentsGrpcService } from "common/grpc";

@Controller("/documents")
export class DocumentsController {
    public constructor(private readonly documentsGrpcService: DocumentsGrpcService) {}

    @Post("/test")
    public test() {
        return this.documentsGrpcService.call("test", { data: "Test data" });
    }
}
