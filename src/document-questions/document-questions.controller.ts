import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentQuestionsService } from './document-questions.service';
import { CreateDocumentQuestionDto } from './dto/create-document-question.dto';
import { UpdateDocumentQuestionDto } from './dto/update-document-question.dto';

@Controller('document-questions')
export class DocumentQuestionsController {
  constructor(
    private readonly documentQuestionsService: DocumentQuestionsService,
  ) {}

  @Post()
  create(@Body() createDocumentQuestionDto: CreateDocumentQuestionDto) {
    return this.documentQuestionsService.create(createDocumentQuestionDto);
  }

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
