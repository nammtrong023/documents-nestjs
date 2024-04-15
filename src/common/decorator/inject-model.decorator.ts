import { InjectModel } from '@nestjs/mongoose';
import { DocumentFile } from 'src/document-files/schema/document-file.schema.entity';
import { DocumentQuestion } from 'src/document-questions/schema/document-question.schema';
import { DocumentText } from 'src/document-texts/schema/document-text.schema';
import { Document } from 'src/documents/schema/document.schema';

export const InjectDocumentModel = () => InjectModel(Document.name);
export const InjectDocumentFileModel = () => InjectModel(DocumentFile.name);
export const InjectDocumentTextModel = () => InjectModel(DocumentText.name);

export const InjectDocumentQuestionModel = () =>
  InjectModel(DocumentQuestion.name);
