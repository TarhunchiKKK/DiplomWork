import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Post, PostSchema } from "./post.schema";

@Schema()
export class AdministrativeDivision {
    @Prop(String)
    public title: string;

    @Prop([PostSchema])
    public posts: Post[];
}

export const AdministrativeDivisionSchema = SchemaFactory.createForClass(AdministrativeDivision);
