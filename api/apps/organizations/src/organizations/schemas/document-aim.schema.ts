import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DocumentAim {
    @Prop(String)
    public value: string;
}

export const DocumentAimSchema = SchemaFactory.createForClass(DocumentAim);
