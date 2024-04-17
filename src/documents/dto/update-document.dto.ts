import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { IsObjectId } from 'nestjs-object-id';
import { DocumentEnum, QuestionTypeEnum } from 'src/common/enum/app.enum';

export class UpdateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  answerContent: string;

  @IsEnum(DocumentEnum)
  documentType: DocumentEnum;

  @IsObjectId()
  @IsOptional()
  documentFileId: string;

  @IsString()
  @ValidateIf((c) => c.documentType === DocumentEnum.DocumentText)
  content?: string;

  @IsEnum(QuestionTypeEnum)
  @ValidateIf((c) => c.documentType === DocumentEnum.DocumentQuestion)
  questionType?: QuestionTypeEnum;

  @IsNotEmpty()
  options: any;

  @IsNotEmpty()
  answer: any;

  @IsNotEmpty()
  @IsObjectId()
  @ValidateIf(
    (c) =>
      c.documentType === DocumentEnum.DocumentText ||
      c.documentType === DocumentEnum.DocumentQuestion,
  )
  documentItemId: string;
}
