import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DocumentEnum } from 'src/common/enum/app.enum';
import { DocumentFile } from 'src/document-files/schema/document-file.schema.entity';

@Schema({ timestamps: true })
export class Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: DocumentEnum })
  documentType: DocumentEnum;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, path: 'DocumentFile' }],
  })
  documentFiles: DocumentFile[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, refPath: 'documentType' })
  documentItem: any;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);

export interface DocumentModel {
  id: string;
  documentType: DocumentEnum;
  documentFiles: DocumentFile[];
  documentItem: any;
}
