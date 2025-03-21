import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentAim, DocumentAimSchema } from "./document-aim.schema";
import { DocumentTypeSchema, DocumentType } from "./document-type.schema";
import { AdministrativeDivision, AdministrativeDivisionSchema } from "./administrative-division.schema";

@Schema()
export class OrganiationSettings {
    @Prop()
    urgencyInterval: number;

    @Prop([DocumentAimSchema])
    documentAims: DocumentAim[];

    @Prop([DocumentTypeSchema])
    documentTypes: DocumentType[];

    @Prop([AdministrativeDivisionSchema])
    administrativeDivisions: AdministrativeDivision[];
}

export const OrganiationSettingsSchema = SchemaFactory.createForClass(OrganiationSettings);
