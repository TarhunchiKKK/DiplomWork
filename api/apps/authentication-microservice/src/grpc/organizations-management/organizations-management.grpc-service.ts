import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
    BaseGrpcService,
    ORGANIZATIONS_MANAGEMENT_PACKAGE_NAME,
    ORGANIZATIONS_MANAGEMENT_SERVICE_NAME,
    OrganizationsManagementServiceClient
} from "common/grpc";

@Injectable()
export class OrganizationsManagementGrpcService extends BaseGrpcService<OrganizationsManagementServiceClient> {
    public constructor(@Inject(ORGANIZATIONS_MANAGEMENT_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, ORGANIZATIONS_MANAGEMENT_SERVICE_NAME);
    }

    public createDefault() {
        return this.serviceClient.createDefault({});
    }
}
