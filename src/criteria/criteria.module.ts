import { Module } from '@nestjs/common';
import { CriteriaService } from './criteria.service';
import { CriteriaController } from './criteria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Criterion, CriterionSchema } from './schema/criterion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Criterion.name,
        schema: CriterionSchema,
      },
    ]),
  ],
  controllers: [CriteriaController],
  providers: [CriteriaService],
})
export class CriteriaModule {}
