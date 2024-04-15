import { Module } from '@nestjs/common';
import { DocumentFilesService } from './document-files.service';
import { DocumentFilesController } from './document-files.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentFile,
  DocumentFileSchema,
} from './schema/document-file.schema.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentFile.name,
        schema: DocumentFileSchema,
      },
    ]),
  ],
  controllers: [DocumentFilesController],
  providers: [DocumentFilesService],
})
export class DocumentFilesModule {}
