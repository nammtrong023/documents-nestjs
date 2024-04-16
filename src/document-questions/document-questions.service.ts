import { Injectable } from '@nestjs/common';
import { UpdateDocumentQuestionDto } from './dto/update-document-question.dto';
import { Model } from 'mongoose';
import { DocumentQuestion } from './schema/document-question.schema';
import { DataNotFoundException } from 'src/exception/data-not-found';
import { DocumentsService } from 'src/documents/documents.service';
import { QuestionTypeEnum } from 'src/common/enum/app.enum';
import { InjectDocQuestionModel } from 'src/common/decorator/inject-model.decorator';

@Injectable()
export class DocumentQuestionsService {
  constructor(
    @InjectDocQuestionModel()
    private documentQuestionModel: Model<DocumentQuestion>,
    private documentService: DocumentsService,
  ) {}
  async create(questionType: QuestionTypeEnum) {
    return new this.documentQuestionModel({ questionType });
  }

  async findAll() {
    return await this.documentQuestionModel.find();
  }

  async findOne(id: string) {
    const documentQuestion = await this.documentQuestionModel.findById(id);
    if (!documentQuestion)
      throw new DataNotFoundException('Document question', 'id', id);
    return documentQuestion;
  }

  async update(id: string, docQuestionDto: UpdateDocumentQuestionDto) {
    const documentQuestion = await this.documentQuestionModel.findByIdAndUpdate(
      id,
      docQuestionDto,
    );
    if (!documentQuestion)
      throw new DataNotFoundException('Document question', 'id', id);
    return documentQuestion;
  }

  async remove(id: string) {
    const documentQuestion =
      await this.documentQuestionModel.findByIdAndDelete(id);
    if (!documentQuestion)
      throw new DataNotFoundException('Document question', 'id', id);
    return documentQuestion;
  }
}
