import { Injectable } from '@nestjs/common';
import { CreateDocumentTextDto } from './dto/create-document-text.dto';
import { UpdateDocumentTextDto } from './dto/update-document-text.dto';
import { Model } from 'mongoose';
import { DocumentText } from './schema/document-text.schema';
import { InjectDocumentTextModel } from 'src/common/decorator/inject-model.decorator';
import { DataNotFoundException } from 'src/exception/data-not-found';
import { DocumentsService } from 'src/documents/documents.service';

@Injectable()
export class DocumentTextsService {
  constructor(
    @InjectDocumentTextModel() private documentTextModel: Model<DocumentText>,
    private documentService: DocumentsService,
  ) {}
  async create(createDocumentTextDto: CreateDocumentTextDto) {
    return new this.documentTextModel(createDocumentTextDto);
  }

  async findAll() {
    return await this.documentTextModel.find();
  }

  async findOne(id: string) {
    const documentText = await this.documentTextModel.findById(id);
    if (!documentText)
      throw new DataNotFoundException('Document text', 'id', id);
    return documentText;
  }

  async update(id: string, docTextDto: UpdateDocumentTextDto) {
    const document = await this.documentService.findOne(docTextDto.document);
    if (!document) {
      throw new DataNotFoundException('Document', 'id', docTextDto.document);
    }
    const documentText = await this.documentTextModel.findByIdAndUpdate(
      id,
      docTextDto,
    );
    if (!documentText)
      throw new DataNotFoundException('Document Text', 'id', id);
    return documentText;
  }

  async remove(id: string) {
    const documentText = await this.documentTextModel.findByIdAndDelete(id);
    if (!documentText)
      throw new DataNotFoundException('Document text', 'id', id);
    return documentText;
  }
}
