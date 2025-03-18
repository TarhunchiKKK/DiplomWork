import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organization } from "./schemas/organization.schema";
import { Model } from "mongoose";
import { Settings } from "./schemas/settings.schema";

@Injectable()
export class OrganizationsService {
    public constructor(@InjectModel(Organization.name) private readonly organizationModel: Model<Organization>) {}

    public async create(dto: { settings: Settings }) {
        return await this.organizationModel.create(dto);
    }
}
