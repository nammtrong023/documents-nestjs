import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DocumentEnum } from 'src/common/enum/app.enum';

@Schema({ timestamps: true })
export class Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: DocumentEnum })
  documentType: DocumentEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, refPath: 'documentType' })
  documentItem: any;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
