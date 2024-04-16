import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './schema/document.schema';
import {
  DocumentFile,
  DocumentFileSchema,
} from 'src/document-files/schema/document-file.schema.entity';
import { DocumentFilesService } from 'src/document-files/document-files.service';
import {
  DocumentText,
  DocumentTextSchema,
} from 'src/document-texts/schema/document-text.schema';
import {
  DocumentQuestion,
  DocumentQuestionSchema,
} from 'src/document-questions/schema/document-question.schema';
import { DocumentTextsService } from 'src/document-texts/document-texts.service';
import { DocumentQuestionsService } from 'src/document-questions/document-questions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Document.name,
        schema: DocumentSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: DocumentFile.name,
        schema: DocumentFileSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: DocumentText.name,
        schema: DocumentTextSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: DocumentQuestion.name,
        schema: DocumentQuestionSchema,
      },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    DocumentFilesService,
    DocumentTextsService,
    DocumentQuestionsService,
  ],
})
export class DocumentsModule {}
