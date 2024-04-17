import { Injectable } from '@nestjs/common';
import { UpdateDocumentQuestionDto } from './dto/update-document-question.dto';
import { Model } from 'mongoose';
import { DataNotFoundException } from 'src/exception/data-not-found';
import { DocumentsService } from 'src/documents/documents.service';
import { QuestionTypeEnum } from 'src/common/enum/app.enum';
import { InjectDocQuestionModel } from 'src/common/decorator/inject-model.decorator';
import { DocumentQuestionModel } from './schema/document-question.schema';
import {
  BoolAnsDto,
  FillBlankAnsDto,
  LinkerAnsDto,
  MultipleChoiceAnsDto,
  OpenAnsDto,
  OrderAnsDto,
  SingleChoiceAnsDto,
} from './dto/check-answer.dto';
import { compareArray } from 'src/utils/utils';

@Injectable()
export class DocumentQuestionsService {
  constructor(
    @InjectDocQuestionModel()
    private documentQuestionModel: Model<DocumentQuestionModel>,
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

  async checkAnswer(id: string, dto: any) {
    const docQuestion = await this.documentQuestionModel
      .findById(id)
      .select(['answer', 'questionType', 'answerContent']);
    const { answer } = docQuestion;
    let isCorrect = false;

    switch (docQuestion.questionType) {
      case QuestionTypeEnum.Bool:
        isCorrect = this.checkBoolAnswer(dto as BoolAnsDto, answer);

      case QuestionTypeEnum.SingleChoice:
        isCorrect = this.checkSingleChoiceAnswer(
          dto as SingleChoiceAnsDto,
          answer,
        );
      case QuestionTypeEnum.MultipleChoice:
        isCorrect = this.checkMultipleChoiceAnswer(
          dto as MultipleChoiceAnsDto,
          answer,
        );
      case QuestionTypeEnum.Linker:
        isCorrect = this.checkLinkerAnswer(dto as LinkerAnsDto, answer);
      case QuestionTypeEnum.Ordered:
        isCorrect = this.checkOrderAnswer(dto as OrderAnsDto, answer);
      default:
        break;
    }

    const message = isCorrect
      ? 'Correct answer!'
      : 'Your answer was incorrect!';
    return {
      data: docQuestion,
      message,
      statusCode: 200,
    };
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

  checkBoolAnswer(dto: BoolAnsDto, answer: boolean) {
    return dto.boolAns === answer;
  }

  checkOrderAnswer(dto: OrderAnsDto, answer: number[]) {
    return compareArray(dto.indexesAns, answer);
  }

  checkSingleChoiceAnswer(dto: SingleChoiceAnsDto, answer: string) {
    return dto.singleChoiceAns === answer;
  }

  checkMultipleChoiceAnswer(dto: MultipleChoiceAnsDto, answers: string[]) {
    return compareArray(dto.multipleChoiceAns.sort(), answers.sort());
  }

  checkLinkerAnswer(dto: LinkerAnsDto, answers: any) {
    return compareArray(dto.linkerAns.sort(), answers.sort());
  }

  checkFillBlankAnswer(dto: FillBlankAnsDto, answers: any) {
    return dto.asnwer === answers;
  }

  async updateOpenAnswer(id: string, dto: OpenAnsDto) {
    const documentQuestion = await this.documentQuestionModel.findByIdAndUpdate(
      id,
      {
        answer: dto,
      },
    );

    if (!documentQuestion)
      throw new DataNotFoundException('Document question', 'id', id);
    return documentQuestion;
  }
}
