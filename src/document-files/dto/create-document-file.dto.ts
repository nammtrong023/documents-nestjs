import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsObjectId } from 'nestjs-object-id';

export class UploadFileDto {
  @IsNotEmpty()
  fileName: string;

  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  fileType: string;

  @IsNotEmpty()
  @IsObjectId()
  documentId: string;
}

export class CreateDocumentFileDto {
  @IsOptional()
  resouceUrl?: string;

  @IsOptional()
  embedCode?: string;
}
