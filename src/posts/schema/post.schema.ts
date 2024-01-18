import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; 
import { Transform, Type } from "class-transformer";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { User, UserSchema } from "src/users/schema/user.schema";

export type PostDocument = HydratedDocument<Post>

@Schema()
export class Post {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  likes: number;

  @Prop()
  deletedAt: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string
}

export const PostSchema = SchemaFactory.createForClass(Post);