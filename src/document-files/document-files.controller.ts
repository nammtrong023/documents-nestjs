import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { DocumentFilesService } from './document-files.service';
import { CreateDocumentFileDto } from './dto/create-document-file.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage-config';
import { fileTypeConvert } from 'src/utils/file-type-convert';

@Controller('document-files')
export class DocumentFilesController {
  constructor(private readonly documentFilesService: DocumentFilesService) {}

  @Post('documents/:documentId/upload')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('document', { storage: storageConfig('documents') }),
  )
  async uploadFile(
    @Param() documentId: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    try {
      const fileType = fileTypeConvert(file.mimetype);
      if (fileType === 'UNKNOWN') {
        throw new HttpException(
          'File type is not supportted',
          HttpStatus.BAD_REQUEST,
        );
      }
      const fileName = file.originalname.replace(/\s/g, '-');
      const path = file.destination + '/' + file.filename.replace(/\s/g, '-');

      const documentFile = await this.documentFilesService.uploadFile({
        fileName,
        fileType,
        path,
        documentId,
      });

      return documentFile;
    } catch (error) {
      throw new HttpException(
        'Failed to process uploaded file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  create(@Body() createDocumentFileDto: CreateDocumentFileDto) {
    return this.documentFilesService.create(createDocumentFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentFilesService.remove(id);
  }
}
