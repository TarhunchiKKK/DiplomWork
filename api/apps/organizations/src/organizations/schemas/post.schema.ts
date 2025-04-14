import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Post {
    @Prop(String)
    public title: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
