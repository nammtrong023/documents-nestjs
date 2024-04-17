import {
  IsEnum,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionTypeEnum } from 'src/common/enum/app.enum';
import { LinkerAnsDto } from './check-answer.dto';

export abstract class BaseQuestionDto {
  @IsEnum(QuestionTypeEnum)
  questionType: QuestionTypeEnum;

  @IsString()
  question: string;

  @IsOptional()
  @IsBoolean()
  isShuffled?: boolean;

  @IsOptional()
  answerContent?: string;
}

export class BoolQuestionDto extends BaseQuestionDto {
  questionType: QuestionTypeEnum.Bool;

  @IsBoolean()
  answer: boolean;
}

export class SingleChoiceQuestionDto extends BaseQuestionDto {
  questionType: QuestionTypeEnum.SingleChoice;

  @IsString()
  answer: string;

  @IsArray()
  options: string[];
}

export class MultipleChoiceQuestionDto extends BaseQuestionDto {
  questionType: QuestionTypeEnum.MultipleChoice;

  @IsArray()
  @IsString({ each: true })
  answer: string[];

  @IsArray()
  @ValidateNested({ each: true })
  options: OptionItem[];
}

export class LinkerQuestionDto extends BaseQuestionDto {
  questionType: QuestionTypeEnum.Linker;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkerAnsDto)
  answer: LinkerAnsDto[];

  @IsArray()
  @IsString({ each: true })
  options: string[];
}

export class FillBlankQuestionDto extends BaseQuestionDto {
  questionType: QuestionTypeEnum.FillBlank;

  @IsString()
  answer: string;
}

export class UpdateDocumentQuestionDto {
  @ValidateNested()
  @Type(() => BaseQuestionDto)
  question: BaseQuestionDto;
}

class OptionItem {
  @IsString()
  content: string;

  @IsInt()
  index: number;
}
