import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DocumentStatus {
    @Prop(String)
    value: string;
}

export const DocumentStatusSchema = SchemaFactory.createForClass(DocumentStatus);
