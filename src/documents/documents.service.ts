import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { InjectDocumentModel } from 'src/common/decorator/inject-model.decorator';
import { Model } from 'mongoose';
import { DataNotFoundException } from 'src/exception/data-not-found';

@Injectable()
export class DocumentsService {
  constructor(@InjectDocumentModel() private documentModel: Model<Document>) {}
  async create() {
    await new this.documentModel().save();
  }

  async findAll() {
    return await this.documentModel.find();
  }

  async findOne(id: string) {
    const document = await this.documentModel.findById(id);
    if (!document) throw new DataNotFoundException('Document', 'id', id);
    return document;
  }

  async update(id: string, createDocumentDto: CreateDocumentDto) {
    const document = await this.documentModel.findByIdAndUpdate(
      id,
      { ...createDocumentDto, documentItem: createDocumentDto.documentItemId },
      { new: true },
    );

    return document;
  }

  async remove(id: string) {
    const document = await this.documentModel.findById(id);
    if (!document) throw new DataNotFoundException('Document', 'id', id);
    return this.documentModel.findByIdAndDelete(id);
  }
}
