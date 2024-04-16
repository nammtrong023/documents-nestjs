import { Injectable } from '@nestjs/common';
import {
  CreateDocumentFileDto,
  UploadFileDto,
} from './dto/create-document-file.dto';
import { InjectDocumentFileModel } from 'src/common/decorator/inject-model.decorator';
import { Model } from 'mongoose';
import { DocumentFile } from './schema/document-file.schema.entity';
import { FileTypeEnum } from 'src/common/enum/app.enum';
import { DataNotFoundException } from 'src/exception/data-not-found';

@Injectable()
export class DocumentFilesService {
  constructor(
    @InjectDocumentFileModel() private documentFileModel: Model<DocumentFile>,
  ) {}

  async uploadFile(uploadFileDto: UploadFileDto) {
    return (
      await this.documentFileModel.create({
        ...uploadFileDto,
        document: uploadFileDto.documentId,
      })
    ).save();
  }

  async create(createFileDto: CreateDocumentFileDto) {
    return (await this.documentFileModel.create(createFileDto)).save();
  }

  async filterByFilteType(filter: FileTypeEnum) {
    return await this.documentFileModel.findOne({
      fileType: filter,
    });
  }
  async remove(id: string) {
    return this.documentFileModel
      .findByIdAndDelete(id)
      .then((deletedDocument) => {
        if (!deletedDocument) {
          throw new DataNotFoundException('Document file', 'id', id);
        }
      });
  }
}
