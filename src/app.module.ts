import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { DocumentFilesModule } from './document-files/document-files.module';
import { DocumentQuestionsModule } from './document-questions/document-questions.module';
import { DocumentTextsModule } from './document-texts/document-texts.module';
import { MONGODB_CONNECTION } from './config/connection-config';
import { CriteriaModule } from './criteria/criteria.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(MONGODB_CONNECTION),
    DocumentsModule,
    DocumentFilesModule,
    DocumentQuestionsModule,
    DocumentTextsModule,
    CriteriaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
