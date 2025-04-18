import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import {
    TOTP_AUTHENTICATION_SERVICE_NAME,
    TotpAuthenticationServiceClient,
    USERS_PACKAGE_NAME
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class TotpAuthenticationGrpcService extends BaseGrpcService<OnlyMethods<TotpAuthenticationServiceClient>> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, TOTP_AUTHENTICATION_SERVICE_NAME);
    }
}
