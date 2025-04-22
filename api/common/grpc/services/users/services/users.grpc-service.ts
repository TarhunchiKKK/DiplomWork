import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import { USERS_PACKAGE_NAME, USERS_SERVICE_NAME, UsersServiceClient } from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class UsersGrpcService extends BaseGrpcService<OnlyMethods<UsersServiceClient>> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, USERS_SERVICE_NAME);
    }
}
