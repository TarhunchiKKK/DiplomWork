import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
    AUTHENTICATION_PACKAGE_NAME,
    AUTHENTICATION_SERVICE_NAME,
    AuthenticationServiceClient,
    RegisterAdminDto
} from "common/grpc";
import { BaseGrpcService } from "../../../../common/grpc/classes/base.grpc-service";

@Injectable()
export class AuthenticationGrpcService extends BaseGrpcService<AuthenticationServiceClient> {
    public constructor(@Inject(AUTHENTICATION_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, AUTHENTICATION_SERVICE_NAME);
    }

    public registerAdmin(dto: RegisterAdminDto) {
        return this.serviceClient.registerAdmin(dto);
    }
}
