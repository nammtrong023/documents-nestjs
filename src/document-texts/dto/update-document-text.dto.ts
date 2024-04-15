import { PartialType } from '@nestjs/swagger';
import { CreateDocumentTextDto } from './create-document-text.dto';

export class UpdateDocumentTextDto extends PartialType(CreateDocumentTextDto) {}
