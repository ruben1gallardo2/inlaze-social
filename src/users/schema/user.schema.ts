import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Post, PostSchema } from 'src/posts/schema/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Transform(({value}) => value.toString)
  _id: ObjectId

  @Prop()
  fullName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
  @Type(() => Post)
  post: Post

  @Prop()
  deletedAt: string

}

export const UserSchema = SchemaFactory.createForClass(User);
