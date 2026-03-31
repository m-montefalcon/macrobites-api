import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  bio: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ type: [String], default: [] })
  saved_posts: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
