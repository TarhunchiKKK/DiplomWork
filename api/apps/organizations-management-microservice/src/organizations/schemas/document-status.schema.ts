import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TDocumentStatus = HydratedDocument<DocumentType>;

@Schema()
export class DocumentStatus {
    @Prop(String)
    value: string;
}

export const DocumentStatusSchema = SchemaFactory.createForClass(DocumentStatus);
