import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ collection: 'comments', timestamps: true })
export class Comment {
  @Prop({ required: true, trim: true })
  post_id: string;

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

  @Prop({ required: false, trim: true })
  parent_id?: string;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ required: true, type: Number, default: 0 })
  likes_count: number;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
