import { Injectable } from '@nestjs/common';
import { CreateDocumentFileDto } from './dto/create-document-file.dto';
import { UpdateDocumentFileDto } from './dto/update-document-file.dto';
import { InjectDocumentFileModel } from 'src/common/decorator/inject-model.decorator';
import { Model } from 'mongoose';
import { DocumentFile } from './schema/document-file.schema.entity';

@Injectable()
export class DocumentFilesService {
  constructor(
    @InjectDocumentFileModel() private documentFileModel: Model<DocumentFile>,
  ) {}

  async create(createDocumentFileDto: CreateDocumentFileDto) {
    return (await this.documentFileModel.create(createDocumentFileDto)).save();
  }

  findAll() {
    return `This action returns all documentFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentFile`;
  }

  update(id: string, updateDocumentFileDto: UpdateDocumentFileDto) {
    console.log(updateDocumentFileDto);
    return `This action updates a #${id} documentFile`;
  }

  remove(id: string) {
    return `This action removes a #${id} documentFile`;
  }
}
