import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Organization, OrganizationSchema } from "./schemas/organization.schema";
import { Settings, SettingsSchema } from "./schemas/settings.schema";
import { DocumentType, DocumentTypeSchema } from "./schemas/document-type.schema";
import { DocumentStatus, DocumentStatusSchema } from "./schemas/document-status.schema";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Organization.name,
                schema: OrganizationSchema
            },
            {
                name: Settings.name,
                schema: SettingsSchema
            },
            {
                name: DocumentType.name,
                schema: DocumentTypeSchema
            },
            {
                name: DocumentStatus.name,
                schema: DocumentStatusSchema
            }
        ])
    ],
    controllers: [OrganizationsController],
    providers: [OrganizationsService]
})
export class OrganizationsModule {}
