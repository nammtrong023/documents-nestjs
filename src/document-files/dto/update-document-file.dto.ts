import { PartialType } from '@nestjs/swagger';
import { CreateDocumentFileDto } from './create-document-file.dto';

export class UpdateDocumentFileDto extends PartialType(CreateDocumentFileDto) {}
