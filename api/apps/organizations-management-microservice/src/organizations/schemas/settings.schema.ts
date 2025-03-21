import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentAim, DocumentAimSchema } from "./document-aim.schema";
import { DocumentTypeSchema, DocumentType } from "./document-type.schema";

@Schema()
export class Settings {
    @Prop()
    urgencyInterval: number;

    @Prop([DocumentAimSchema])
    documentAims: DocumentAim[];

    @Prop([DocumentTypeSchema])
    documentTypes: DocumentType[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
