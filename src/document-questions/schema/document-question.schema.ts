import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DocumentFile } from 'src/document-files/schema/document-file.schema.entity';
import { Document } from 'src/documents/schema/document.schema';
import {
  CorrectionMethodEnum,
  QuestionTypeEnum,
  ResponseMethodEnum,
} from 'src/common/enum/app.enum';

@Schema({ timestamps: true })
export class DocumentQuestion {
  @Prop({ required: true })
  question: string;

  @Prop({ default: true })
  isShuffled: boolean;

  @Prop()
  answerContent: string;

  @Prop({ enum: ResponseMethodEnum })
  responseMethod: ResponseMethodEnum;

  @Prop({ enum: CorrectionMethodEnum })
  correctionMethod: CorrectionMethodEnum;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  options: any;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  answer: any;

  @Prop({ enum: QuestionTypeEnum })
  questionType: QuestionTypeEnum;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DocumentFile' }],
  })
  documentFiles: DocumentFile[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Document' })
  document: Document;
}
export const DocumentQuestionSchema =
  SchemaFactory.createForClass(DocumentQuestion);

export interface DocumentQuestionModel {
  question: string;
  isShuffled: boolean;
  answerContent: string;
  responseMethod: ResponseMethodEnum;
  correctionMethod: CorrectionMethodEnum;
  options: any;
  answer: any;
  questionType: QuestionTypeEnum;
  documentFiles: DocumentFile[];
  document: Document;
}
