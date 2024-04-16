import { IsArray, IsOptional, IsString } from 'class-validator';
import { IsObjectId } from 'nestjs-object-id';

export class CreateDocumentTextDto {
  @IsString()
  content?: string;

  @IsArray({ each: true })
  @IsOptional()
  @IsObjectId()
  documentFiles?: string[];

  @IsOptional()
  @IsObjectId()
  document?: string;
}
