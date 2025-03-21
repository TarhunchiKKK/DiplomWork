import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrganiationSettings, OrganiationSettingsSchema } from "./organization-settings.schema";

@Schema()
export class Organization {
    @Prop({ type: OrganiationSettingsSchema })
    settings: OrganiationSettings;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
