import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organization } from "./schemas/organization.schema";
import { Model } from "mongoose";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateDocumentAimsDto } from "./dto/update-document-aims.dto";
import { UpdateDocumentTypesDto } from "./dto/update-document-types.dto";
import { UpdateAdministrativeDivisionsDto } from "./dto/update-administrative-divisions.dto";

@Injectable()
export class OrganizationsService {
    public constructor(@InjectModel(Organization.name) private readonly organizationModel: Model<Organization>) {}

    public async create(dto: CreateOrganizationDto) {
        return await this.organizationModel.create(dto);
    }

    public async findOneById(organizationId: string) {
        return await this.organizationModel.findById(organizationId);
    }

    public async updateDocumentAims(dto: UpdateDocumentAimsDto) {
        const organization = await this.findOneById(dto.organizationId);

        if (organization) {
            organization.documentAims = dto.documentAims;

            await organization.save();
        }
    }

    public async updateDocumentTypes(dto: UpdateDocumentTypesDto) {
        const organization = await this.findOneById(dto.organizationId);

        if (organization) {
            // organization.documentTypes = dto.documentTypes;

            await organization.save();
        }
    }

    public async updateAdministrativeDivisions(dto: UpdateAdministrativeDivisionsDto) {
        const organization = await this.findOneById(dto.organizationId);

        if (organization) {
            organization.administrativeDivisions = dto.administrativeDivisions;

            await organization.save();
        }
    }
}
