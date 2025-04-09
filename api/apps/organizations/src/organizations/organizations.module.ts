import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Organization, OrganizationSchema } from "./schemas/organization.schema";
import { DocumentType, DocumentTypeSchema } from "./schemas/document-type.schema";
import { DocumentAim, DocumentAimSchema } from "./schemas/document-aim.schema";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";
import { AdministrativeDivision, AdministrativeDivisionSchema } from "./schemas/administrative-division.schema";
import { Post, PostSchema } from "./schemas/post.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Organization.name,
                schema: OrganizationSchema
            },
            {
                name: DocumentAim.name,
                schema: DocumentAimSchema
            },
            {
                name: DocumentType.name,
                schema: DocumentTypeSchema
            },
            {
                name: AdministrativeDivision.name,
                schema: AdministrativeDivisionSchema
            },
            {
                name: Post.name,
                schema: PostSchema
            }
        ])
    ],
    controllers: [OrganizationsController],
    providers: [OrganizationsService]
})
export class OrganizationsModule {}
