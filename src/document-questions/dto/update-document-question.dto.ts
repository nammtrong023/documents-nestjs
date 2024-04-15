import { PartialType } from '@nestjs/swagger';
import { CreateDocumentQuestionDto } from './create-document-question.dto';

export class UpdateDocumentQuestionDto extends PartialType(CreateDocumentQuestionDto) {}
