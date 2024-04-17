import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { DocumentQuestionsService } from './document-questions.service';
import { UpdateDocumentQuestionDto } from './dto/update-document-question.dto';
import { QuestionTypeEnum } from 'src/common/enum/app.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage-config';
import { validateFileUpload } from 'src/utils/validate-file-upload';

@Controller('document-questions')
export class DocumentQuestionsController {
  constructor(
    private readonly documentQuestionsService: DocumentQuestionsService,
  ) {}

  @Post()
  create(@Body() questionType: QuestionTypeEnum) {
    {
      return this.documentQuestionsService.create(questionType);
    }
  }

  @Post(':id/check-answer')
  checkAnswer(@Param('id') id: string, @Body() answer: any) {
    {
      return this.documentQuestionsService.checkAnswer(id, answer);
    }
  }

  @Post(':id/upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageConfig('document-questions/open-answers'),
    }),
  )
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile(validateFileUpload('.(png|jpeg|jpg|docx|pdf)'))
    file: Express.Multer.File,
  ) {
    try {
      const fileName = file.originalname.replace(/\s/g, '-');
      const path = file.destination + '/' + file.filename.replace(/\s/g, '-');
      const fileData = { fileName, path };
      this.documentQuestionsService.updateOpenAnswer(id, {
        files: [{ ...fileData }],
      });
    } catch (error) {
      throw new HttpException(
        'Failed to process uploaded file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Patch(':id/submit-open-answer')
  // submitOpenAnswer(@Param('id') id: string, @Body() content: string) {
  //   {
  //     return this.documentQuestionsService.updateOpenAnswer(id, answer);
  //   }
  // }

  @Get()
  findAll() {
    return this.documentQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentQuestionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentQuestionDto: UpdateDocumentQuestionDto,
  ) {
    return this.documentQuestionsService.update(id, updateDocumentQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentQuestionsService.remove(id);
  }
}
