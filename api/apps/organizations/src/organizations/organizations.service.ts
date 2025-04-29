import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organization } from "./schemas/organization.schema";
import { Model } from "mongoose";
import { ICreateOrganizationDto } from "./interfaces/create-organization.dto";
import { IUpdateOrganizationDto } from "./interfaces/update-organization.dto";

@Injectable()
export class OrganizationsService {
    public constructor(@InjectModel(Organization.name) private readonly organizationModel: Model<Organization>) {}

    public async create(dto: ICreateOrganizationDto) {
        return await this.organizationModel.create(dto);
    }

    public async findOneById(organizationId: string) {
        const organization = await this.organizationModel.findById(organizationId);

        if (!organization) {
            throw new NotFoundException("Организация не найдена");
        }

        return organization;
    }

    public async update(organizationId: string, dto: IUpdateOrganizationDto) {
        const organization = await this.findOneById(organizationId);

        Object.assign(organization, dto);

        await organization.save();
    }
}
