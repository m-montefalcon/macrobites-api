import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InteractionsDocument = HydratedDocument<Interactions>;

// you can define allowed interaction types
export type InteractionType = 'like' | 'save';

@Schema({ collection: 'interactions', timestamps: true })
export class Interactions {
  @Prop({ required: true, trim: true })
  user_id: string;

  @Prop({ required: true, trim: true })
  post_id: string;

  @Prop({
    required: true,
    enum: ['like', 'save'],
  })
  type: InteractionType;
}

export const InteractionsSchema = SchemaFactory.createForClass(Interactions);
