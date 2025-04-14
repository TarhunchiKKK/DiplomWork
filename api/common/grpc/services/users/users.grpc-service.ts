import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { UsersServiceClient, USERS_PACKAGE_NAME, USERS_SERVICE_NAME } from "common/grpc";
import { BaseGrpcService } from "../base";
import { OnlyMethods } from "common/utils";

@Injectable()
export class UsersGrpcService extends BaseGrpcService<OnlyMethods<UsersServiceClient>> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, USERS_SERVICE_NAME);
    }
}
