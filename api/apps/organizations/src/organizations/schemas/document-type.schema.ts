import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DocumentType {
    @Prop(String)
    public value: string;
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType);
