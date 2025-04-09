import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Post, PostSchema } from "./post.schema";

@Schema()
export class AdministrativeDivision {
    @Prop(String)
    title: string;

    @Prop([PostSchema])
    posts: Post[];
}

export const AdministrativeDivisionSchema = SchemaFactory.createForClass(AdministrativeDivision);
