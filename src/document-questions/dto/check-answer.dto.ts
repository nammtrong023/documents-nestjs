import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';

export class BoolAnsDto {
  @IsBoolean()
  boolAns: boolean;
}

export class SingleChoiceAnsDto {
  @IsString()
  singleChoiceAns: string;
}

export class MultipleChoiceAnsDto {
  @IsArray()
  multipleChoiceAns: string[];
}

export class OrderAnsDto {
  @IsArray()
  indexesAns: number[];
}

export class LinkerAnsDto {
  @IsArray()
  linkerAns: LinkerAnsDto[];
}

export class LinkerItemDto {
  @IsString()
  leftContent: string;

  @IsString()
  rightContent: string;
}

export class FillBlankAnsDto {
  @IsString()
  asnwer: string;
}

export class OpenAnsDto {
  @IsString()
  content?: string;

  @IsArray()
  @ValidateNested({ each: true })
  files?: FileUploadDto[];
}

export class FileUploadDto {
  @IsString()
  fileName: string;
  @IsString()
  path: string;
}
