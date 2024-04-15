import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UploadDataModule } from './upload-data/upload-data.module';
import { BullModule } from '@nestjs/bullmq';
import { DocumentsModule } from './documents/documents.module';
import { DocumentFilesModule } from './document-files/document-files.module';
import { DocumentQuestionsModule } from './document-questions/document-questions.module';
import { DocumentTextsModule } from './document-texts/document-texts.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL),
    UploadDataModule,
    DocumentsModule,
    DocumentFilesModule,
    DocumentQuestionsModule,
    DocumentTextsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
