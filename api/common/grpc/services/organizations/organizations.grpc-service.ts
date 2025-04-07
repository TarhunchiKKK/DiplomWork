import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
    OrganizationsServiceClient,
    IUpdateDocumentAimsDto,
    IUpdateDocumentTypesDto,
    IUpdateAdministrativeDivisionsDto,
    IUpdateUrgencyIntervalDto,
    ORGANIZATIONS_SERVICE_NAME,
    ORGANIZATIONS_PACKAGE_NAME
} from "common/grpc/generated";
import { BaseGrpcService } from "../base.grpc-service";

@Injectable()
export class OrganizationsGrpcService extends BaseGrpcService<OrganizationsServiceClient> {
    public constructor(@Inject(ORGANIZATIONS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, ORGANIZATIONS_SERVICE_NAME);
    }

    public createDefault() {
        return this.serviceClient.createDefault({});
    }

    public findOneById(id: string) {
        return this.serviceClient.findOneById({ value: id });
    }

    public updateUrgencyInterval(dto: IUpdateUrgencyIntervalDto) {
        return this.serviceClient.updateUrgencyInterval(dto);
    }

    public updateDocumentAims(dto: IUpdateDocumentAimsDto) {
        return this.serviceClient.updateDocumentAims(dto);
    }

    public updateDocumenttypes(dto: IUpdateDocumentTypesDto) {
        return this.serviceClient.updateDocumentTypes(dto);
    }

    public updateAdministrativeDivisions(dto: IUpdateAdministrativeDivisionsDto) {
        return this.serviceClient.updateAdministrativeDivisions(dto);
    }
}
