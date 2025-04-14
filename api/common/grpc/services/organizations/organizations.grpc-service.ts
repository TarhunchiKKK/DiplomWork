import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
    OrganizationsServiceClient,
    ORGANIZATIONS_SERVICE_NAME,
    ORGANIZATIONS_PACKAGE_NAME
} from "common/grpc/generated";
import { BaseGrpcService } from "../base";
import { OnlyMethods } from "common/utils";

@Injectable()
export class OrganizationsGrpcService extends BaseGrpcService<OnlyMethods<OrganizationsServiceClient>> {
    public constructor(@Inject(ORGANIZATIONS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, ORGANIZATIONS_SERVICE_NAME);
    }
}
