import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AdministrativeDivisionSchema, AdministrativeDivision } from "./administrative-division.schema";
import { DocumentAimSchema, DocumentAim } from "./document-aim.schema";
import { DocumentType, DocumentTypeSchema } from "./document-type.schema";

@Schema()
export class Organization {
    @Prop(Number)
    urgencyInterval: number;

    @Prop([DocumentAimSchema])
    documentAims: DocumentAim[];

    @Prop([DocumentTypeSchema])
    documentTypes: DocumentType[];

    @Prop([AdministrativeDivisionSchema])
    administrativeDivisions: AdministrativeDivision[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
