import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../base.grpc-service";
import { DOCUMENTS_PACKAGE_NAME, DOCUMENTS_SERVICE_NAME, DocumentsServiceClient } from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";
import { OnlyMethods } from "common/utils";

@Injectable()
export class DocumentsGrpcService extends BaseGrpcService<OnlyMethods<DocumentsServiceClient>> {
    public constructor(@Inject(DOCUMENTS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, DOCUMENTS_SERVICE_NAME);
    }
}
