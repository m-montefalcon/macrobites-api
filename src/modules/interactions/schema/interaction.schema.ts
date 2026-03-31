import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InteractionDocument = HydratedDocument<Interaction>;

export type InteractionType = 'like' | 'save';

@Schema({ collection: 'interactions', timestamps: true })
export class Interaction {
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

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
