import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import {
    DOCUMENTS_PACKAGE_NAME,
    FAVOURITE_DOCUMENTS_SERVICE_NAME,
    FavouriteDocumentsServiceClient
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class FavouriteDocumentsGrpcService extends BaseGrpcService<OnlyMethods<FavouriteDocumentsServiceClient>> {
    public constructor(@Inject(DOCUMENTS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, FAVOURITE_DOCUMENTS_SERVICE_NAME);
    }
}
