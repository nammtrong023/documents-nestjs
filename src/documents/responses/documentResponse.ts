import { DocumentEnum } from 'src/common/enum/app.enum';
import { Document } from '../schema/document.schema';

export class DocumentResponse {
  title: string;
  documentType: DocumentEnum;
  documentItems: any;

  static fromDocument(document: Document): DocumentResponse {
    return {
      title: document.title,
      documentItems: document.documentItem,
      documentType: document.documentType,
    };
  }
}
