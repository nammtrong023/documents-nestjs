import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from 'nestjs-object-id';
import { DocumentEnum } from 'src/enum/app.enum';

export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(DocumentEnum)
  documentType: DocumentEnum;

  @IsNotEmpty()
  @IsObjectId()
  documentItemId: string;
}
