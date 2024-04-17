import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'src/documents/schema/document.schema';

@Schema()
export class Criterion {
  @Prop({ required: true })
  title: string;

  @Prop()
  grades?: Grade[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Document.name })
  document: Document;
}

export const CriterionSchema = SchemaFactory.createForClass(Criterion);

export interface CriterionModel {
  title: string;

  grades?: Grade[];

  document: Document;
}

export interface Grade {
  gradeContent: string;
  star: number;
}
