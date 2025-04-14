import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AdministrativeDivisionSchema, AdministrativeDivision } from "./administrative-division.schema";
import { DocumentAimSchema, DocumentAim } from "./document-aim.schema";
import { DocumentType, DocumentTypeSchema } from "./document-type.schema";

@Schema()
export class Organization {
    @Prop([DocumentAimSchema])
    public documentAims: DocumentAim[];

    @Prop([DocumentTypeSchema])
    public documentTypes: DocumentType[];

    @Prop([AdministrativeDivisionSchema])
    public administrativeDivisions: AdministrativeDivision[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
