import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DocumentFile } from 'src/document-files/schema/document-file.schema.entity';
import { Document } from 'src/documents/schema/document.schema';

@Schema({ timestamps: true })
export class DocumentText {
  @Prop()
  content: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DocumentFile' }],
  })
  documentFiles: DocumentFile[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Document' })
  document: Document;
}

export const DocumentTextSchema = SchemaFactory.createForClass(DocumentText);
