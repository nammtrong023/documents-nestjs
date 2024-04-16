import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'src/documents/schema/document.schema';

@Schema({ timestamps: true })
export class DocumentFile {
  @Prop({ required: true })
  fileName?: string;

  @Prop({ required: true })
  fileType?: string;

  @Prop({ required: true })
  path?: string;

  @Prop({ required: false })
  resouceUrl?: string;

  @Prop({ required: false })
  embedCode?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Document' })
  document: Document;
}

export const DocumentFileSchema = SchemaFactory.createForClass(DocumentFile);
