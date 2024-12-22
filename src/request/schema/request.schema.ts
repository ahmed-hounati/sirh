import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema({ timestamps: true })
export class Request {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: 'leave' | 'raise' | 'complaint';

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
}

export const RequestSchema = SchemaFactory.createForClass(Request);
