import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop({
    required: true,
    type: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String, required: false },
    },
  })
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  content: string; // store HTML from WYSIWYG editor

  @Prop({
    required: true,
    type: {
      calories: { type: Number, required: true },
      protein: { type: Number, required: true },
      fat: { type: Number, required: true },
      carbs: { type: Number, required: true },
    },
  })
  macros: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };

  @Prop({ required: false, type: [String], default: [] })
  images: string[];

  @Prop({ required: true, type: Number, default: 0 })
  likes_count: number;

  @Prop({ required: true, type: Number, default: 0 })
  comments_count: number;

  @Prop({ required: true, type: Number, default: 0 })
  saves_counts: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
