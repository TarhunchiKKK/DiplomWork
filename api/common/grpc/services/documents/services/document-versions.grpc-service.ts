import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import {
    DOCUMENT_VERSIONS_SERVICE_NAME,
    DOCUMENTS_PACKAGE_NAME,
    DocumentVersionsServiceClient
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class DocumentVersionsGrpcService extends BaseGrpcService<OnlyMethods<DocumentVersionsServiceClient>> {
    public constructor(@Inject(DOCUMENTS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, DOCUMENT_VERSIONS_SERVICE_NAME);
    }
}
