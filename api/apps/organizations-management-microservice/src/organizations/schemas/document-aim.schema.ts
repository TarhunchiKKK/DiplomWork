import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DocumentAim {
    @Prop(String)
    value: string;
}

export const DocumentAimSchema = SchemaFactory.createForClass(DocumentAim);
