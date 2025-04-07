import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DocumentType {
    @Prop(String)
    value: string;
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType);
