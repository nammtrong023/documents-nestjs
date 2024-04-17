import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';

export class CreateCriterionDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  grades: GradeDto[];
}

class GradeDto {
  @IsString()
  gradeContent: string;
  @IsInt()
  star: number;
}
