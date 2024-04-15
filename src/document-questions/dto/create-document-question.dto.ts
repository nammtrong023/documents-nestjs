import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsObjectId } from 'nestjs-object-id';
import {
  CorrectionMethodEnum,
  QuestionTypeEnum,
  ResponseMethodEnum,
} from 'src/common/enum/app.enum';

export class CreateDocumentQuestionDto {
  @IsString()
  question: string;

  @IsOptional()
  @IsBoolean()
  isShuffled?: boolean;

  @IsString()
  @IsOptional()
  answerContent?: string;

  @IsEnum(ResponseMethodEnum)
  @IsOptional()
  responseMethod?: ResponseMethodEnum;

  @IsEnum(CorrectionMethodEnum)
  @IsOptional()
  correctionMethod?: CorrectionMethodEnum;

  @IsOptional()
  options: any;

  @IsOptional()
  answer?: any;

  @IsEnum(CorrectionMethodEnum)
  questionType: QuestionTypeEnum;

  @IsOptional()
  @IsArray({ each: true })
  @IsObjectId()
  documentFiles: string[];

  @IsOptional()
  @IsObjectId()
  document?: string;
}
