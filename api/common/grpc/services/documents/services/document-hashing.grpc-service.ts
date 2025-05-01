import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import {
    DOCUMENT_HASHING_SERVICE_NAME,
    DocumentHashingServiceClient,
    DOCUMENTS_PACKAGE_NAME
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class DocumentHashingGrpcService extends BaseGrpcService<OnlyMethods<DocumentHashingServiceClient>> {
    public constructor(@Inject(DOCUMENTS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, DOCUMENT_HASHING_SERVICE_NAME);
    }
}
