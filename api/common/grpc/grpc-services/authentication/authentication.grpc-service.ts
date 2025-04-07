import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
    AuthenticationServiceClient,
    AUTHENTICATION_PACKAGE_NAME,
    AUTHENTICATION_SERVICE_NAME,
    IRegisterAdminDto
} from "common/grpc/generated";
import { BaseGrpcService } from "../base.grpc-service";

@Injectable()
export class AuthenticationGrpcService extends BaseGrpcService<AuthenticationServiceClient> {
    public constructor(@Inject(AUTHENTICATION_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, AUTHENTICATION_SERVICE_NAME);
    }

    public registerAdmin(dto: IRegisterAdminDto) {
        try {
            return this.serviceClient.registerAdmin(dto);
        } catch (error) {
            throw error;
        }
    }
}
