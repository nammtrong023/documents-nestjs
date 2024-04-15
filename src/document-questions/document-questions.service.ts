import { Injectable } from '@nestjs/common';
import { CreateDocumentQuestionDto } from './dto/create-document-question.dto';
import { UpdateDocumentQuestionDto } from './dto/update-document-question.dto';
import { InjectDocumentQuestionModel } from 'src/common/decorator/inject-model.decorator';
import { Model } from 'mongoose';
import { DocumentQuestion } from './schema/document-question.schema';
import { DataNotFoundException } from 'src/exception/data-not-found';
import { DocumentsService } from 'src/documents/documents.service';

@Injectable()
export class DocumentQuestionsService {
  constructor(
    @InjectDocumentQuestionModel()
    private documentQuestionModel: Model<DocumentQuestion>,
    private documentService: DocumentsService,
  ) {}
  create(createDocumentQuestionDto: CreateDocumentQuestionDto) {
    return new this.documentQuestionModel(createDocumentQuestionDto);
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
    const document = await this.documentService.findOne(
      docQuestionDto.document,
    );
    if (!document) {
      throw new DataNotFoundException(
        'Document',
        'id',
        docQuestionDto.document,
      );
    }

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
