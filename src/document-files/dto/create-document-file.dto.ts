import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDocumentFileDto {
  @IsNotEmpty()
  fileName: string;

  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  fileType: string;

  @IsOptional()
  resouceUrl?: string;

  @IsOptional()
  embedCode?: string;
}
