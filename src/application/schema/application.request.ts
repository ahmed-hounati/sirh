import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true })
  candidateEmail: string;

  @Prop({ required: true })
  resumeUrl: string;

  @Prop({ required: true })
  offerId: string;

  @Prop({ required: true })
  hrId: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
