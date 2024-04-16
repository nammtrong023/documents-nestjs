import { IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';
import { DocumentEnum, QuestionTypeEnum } from 'src/common/enum/app.enum';

export class CreateDocumentDto {
  @IsEnum(DocumentEnum)
  documentType: DocumentEnum;

  @ValidateIf((o) => o.documentType === DocumentEnum.DocumentQuestion)
  @IsNotEmpty()
  @IsEnum(QuestionTypeEnum)
  questionType: QuestionTypeEnum;
}
