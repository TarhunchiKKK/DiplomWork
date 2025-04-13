import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organization } from "./schemas/organization.schema";
import { Model } from "mongoose";
import { ICreateOrganizationDto } from "./dto/create-organization.dto";
import { IUpdateAdministrativeDivisionsDto, IUpdateDocumentAimsDto, IUpdateDocumentTypesDto } from "common/grpc";

@Injectable()
export class OrganizationsService {
    public constructor(@InjectModel(Organization.name) private readonly organizationModel: Model<Organization>) {}

    public async create(dto: ICreateOrganizationDto) {
        return await this.organizationModel.create(dto);
    }

    public async findOneById(organizationId: string) {
        return await this.organizationModel.findById(organizationId);
    }

    public async updateDocumentAims(dto: IUpdateDocumentAimsDto) {
        const organization = await this.findOneById(dto.organizationId);

        if (organization) {
            organization.documentAims = dto.documentAims;

            await organization.save();
        }
    }

    public async updateDocumentTypes(dto: IUpdateDocumentTypesDto) {
        const organization = await this.findOneById(dto.organizationId);

        if (organization) {
            organization.documentTypes = dto.documentTypes;

            await organization.save();
        }
    }

    public async updateAdministrativeDivisions(dto: IUpdateAdministrativeDivisionsDto) {
        const organization = await this.findOneById(dto.organizationId);

        if (organization) {
            organization.administrativeDivisions = dto.administrativeDivisions;

            await organization.save();
        }
    }
}
