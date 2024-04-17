import { Injectable } from '@nestjs/common';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { UpdateCriterionDto } from './dto/update-criterion.dto';
import { Model } from 'mongoose';
import { InjectCriterionModel } from 'src/common/decorator/inject-model.decorator';
import { Criterion } from './schema/criterion.schema';
import { DataNotFoundException } from 'src/exception/data-not-found';

@Injectable()
export class CriteriaService {
  constructor(
    @InjectCriterionModel() private criterionModel: Model<Criterion>,
  ) {}
  async create(createCriterionDto: CreateCriterionDto) {
    await new this.criterionModel(createCriterionDto).save();
  }

  async findAll() {
    return await this.criterionModel.find();
  }

  async findOne(id: string) {
    const criterion = await this.criterionModel.findById(id);
    if (!criterion) throw new DataNotFoundException('Criterion', 'id', id);
    return criterion;
  }

  async update(id: string, criterionDto: UpdateCriterionDto) {
    const criterion = await this.criterionModel.findByIdAndUpdate(
      id,
      criterionDto,
    );
    if (!criterion) throw new DataNotFoundException('Criterion', 'id', id);
    return criterion;
  }

  async remove(id: string) {
    const criterion = await this.criterionModel.findByIdAndDelete(id);
    if (!criterion) throw new DataNotFoundException('Criterion', 'id', id);
    return criterion;
  }
}
