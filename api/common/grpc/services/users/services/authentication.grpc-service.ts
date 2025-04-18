import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import { AUTHENTICATION_SERVICE_NAME, AuthenticationServiceClient, USERS_PACKAGE_NAME } from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class AuthenticationGrpcService extends BaseGrpcService<OnlyMethods<AuthenticationServiceClient>> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, AUTHENTICATION_SERVICE_NAME);
    }
}
