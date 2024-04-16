import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { InjectDocumentModel } from 'src/common/decorator/inject-model.decorator';
import { Model } from 'mongoose';
import { DataNotFoundException } from 'src/exception/data-not-found';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PaginationRequest, PaginationResponse } from 'src/types/types';
import { DocumentFilesService } from 'src/document-files/document-files.service';
import { DocumentEnum } from 'src/common/enum/app.enum';
import { DocumentTextsService } from 'src/document-texts/document-texts.service';
import { DocumentModel } from './schema/document.schema';
import { DocumentQuestionsService } from 'src/document-questions/document-questions.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectDocumentModel() private documentModel: Model<DocumentModel>,
    private docFileService: DocumentFilesService,
    private docTextService: DocumentTextsService,
    private docQuestionService: DocumentQuestionsService,
  ) {}
  async create(createDocumentDto: CreateDocumentDto) {
    let documentItemId: string;
    const documentType = createDocumentDto.documentType;

    switch (documentType) {
      case DocumentEnum.DocumentText:
        const documentText = await this.docTextService.create();
        documentItemId = documentText.id;
        break;
      case DocumentEnum.DocumentQuestion:
        const docQuestion = await this.docQuestionService.create(
          createDocumentDto.questionType,
        );
        documentItemId = docQuestion.id;
        break;

      default:
        break;
    }

    return await new this.documentModel({
      documentType,
      documentItem: documentItemId,
    }).save();
  }

  async findAll(
    pagination: PaginationRequest,
  ): Promise<PaginationResponse<DocumentModel>> {
    const { limit, page, sort, search, filter } = pagination;
    const skip = (page - 1) * limit;
    let query: any = {};

    if (search) {
      query = [{ title: { $regex: search, $options: 'i' } }];
    }

    if (filter) {
      const documentFile = await this.docFileService.filterByFilteType(filter);
      if (documentFile) {
        query.documentFiles = documentFile._id;
      }
    }

    const [documents, totalCount] = await Promise.all([
      this.documentModel
        .find({ ...query })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: sort || 'desc' }),
      this.documentModel.countDocuments(query),
    ]);

    const totalPage = Math.ceil(totalCount / limit);
    return {
      data: documents,
      meta: { limit, page, totalPage },
    };
  }

  async findOne(id: string) {
    const document = await this.documentModel.findById(id);
    if (!document) throw new DataNotFoundException('Document', 'id', id);
    return document;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentModel.findById(id);

    if (!document) {
      throw new DataNotFoundException('Document', 'id', id);
    }

    switch (document.documentType) {
      case DocumentEnum.DocumentFile:
        document.updateOne(
          {
            ...updateDocumentDto,
            documentFiles: updateDocumentDto.documentFileId,
          },
          { new: true },
        );
        break;
      case DocumentEnum.DocumentText:
        document.updateOne(
          {
            ...updateDocumentDto,
            documentItems: updateDocumentDto.documentFileId,
          },
          { new: true },
        );
        this.docTextService.update(document.documentItem.id, {
          content: updateDocumentDto.content,
        });
        break;
      case DocumentEnum.DocumentQuestion:
        document.updateOne(
          {
            ...updateDocumentDto,
            documentItems: updateDocumentDto.documentFileId,
          },
          { new: true },
        );
        this.docTextService.update(document.documentItem.id, {
          content: updateDocumentDto.content,
        });
        break;
      default:
        break;
    }

    return document;
  }

  async remove(id: string) {
    const document = await this.documentModel.findById(id);
    if (!document) throw new DataNotFoundException('Document', 'id', id);
    return this.documentModel.findByIdAndDelete(id);
  }
}
