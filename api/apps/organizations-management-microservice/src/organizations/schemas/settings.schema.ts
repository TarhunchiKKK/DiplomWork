import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentStatus, DocumentStatusSchema } from "./document-status.schema";
import { DocumentTypeSchema, DocumentType } from "./document-type.schema";

@Schema()
export class Settings {
    @Prop()
    urgencyInterval: number;

    @Prop([DocumentTypeSchema])
    documentTypes: DocumentType[];

    @Prop([DocumentStatusSchema])
    documentStatuses: DocumentStatus[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
