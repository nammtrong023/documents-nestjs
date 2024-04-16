import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import {
  CorrectionMethodEnum,
  QuestionTypeEnum,
  ResponseMethodEnum,
} from 'src/common/enum/app.enum';

export class UpdateDocumentQuestionDto {
  @IsEnum(QuestionTypeEnum)
  questionType: QuestionTypeEnum;

  @IsString()
  question: string;

  @IsOptional()
  @IsBoolean()
  isShuffled?: boolean;

  @IsString()
  @IsOptional()
  answerContent?: string;

  @ValidateIf((o) => o.questionType === QuestionTypeEnum.Open)
  @IsEnum(ResponseMethodEnum)
  responseMethod?: ResponseMethodEnum;

  @ValidateIf((o) => o.questionType === QuestionTypeEnum.Open)
  @IsEnum(CorrectionMethodEnum)
  correctionMethod?: CorrectionMethodEnum;

  @IsOptional()
  options: any;

  @IsOptional()
  answer?: any;
}
