import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import {
    DOCUMENT_COMMENTS_SERVICE_NAME,
    DocumentCommentsServiceClient,
    DOCUMENTS_PACKAGE_NAME
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class DocumentCommentsGrpcService extends BaseGrpcService<OnlyMethods<DocumentCommentsServiceClient>> {
    public constructor(@Inject(DOCUMENTS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, DOCUMENT_COMMENTS_SERVICE_NAME);
    }
}
