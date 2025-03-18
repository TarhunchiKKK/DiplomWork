import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Settings, SettingsSchema } from "./settings.schema";

@Schema()
export class Organization {
    @Prop({ type: SettingsSchema })
    settings: Settings;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
