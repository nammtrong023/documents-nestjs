import { Module } from '@nestjs/common';
import { DocumentQuestionsService } from './document-questions.service';
import { DocumentQuestionsController } from './document-questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentQuestion,
  DocumentQuestionSchema,
} from './schema/document-question.schema';
import { Document, DocumentSchema } from 'src/documents/schema/document.schema';
import { DocumentsService } from 'src/documents/documents.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentQuestion.name,
        schema: DocumentQuestionSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Document.name,
        schema: DocumentSchema,
      },
    ]),
  ],
  controllers: [DocumentQuestionsController],
  providers: [DocumentQuestionsService, DocumentsService],
})
export class DocumentQuestionsModule {}
