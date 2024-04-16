import { IsEnum } from 'class-validator';
import {
  CorrectionMethodEnum,
  QuestionTypeEnum,
} from 'src/common/enum/app.enum';

export class CreateDocumentQuestionDto {
  @IsEnum(CorrectionMethodEnum)
  questionType: QuestionTypeEnum;
}
