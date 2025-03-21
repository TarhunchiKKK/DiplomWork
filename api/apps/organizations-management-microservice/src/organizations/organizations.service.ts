import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organization } from "./schemas/organization.schema";
import { Model } from "mongoose";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateDocumentAimsDto } from "./dto/update-document-aims.dto";

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

        organization.settings.documentAims = dto.documentAims;

        await organization.save();
    }
}
