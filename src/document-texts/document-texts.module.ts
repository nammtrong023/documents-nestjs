import { Module } from '@nestjs/common';
import { DocumentTextsService } from './document-texts.service';
import { DocumentTextsController } from './document-texts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentText,
  DocumentTextSchema,
} from './schema/document-text.schema';
import { Document, DocumentSchema } from 'src/documents/schema/document.schema';
import { DocumentsService } from 'src/documents/documents.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentText.name,
        schema: DocumentTextSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Document.name,
        schema: DocumentSchema,
      },
    ]),
  ],
  controllers: [DocumentTextsController],
  providers: [DocumentTextsService, DocumentsService],
})
export class DocumentTextsModule {}
