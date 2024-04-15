import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { UpdateDocumentFileDto } from './dto/update-document-file.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from 'src/upload-data/dto/file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/store-config';
import { Public } from 'src/common/decorator/public.decorator';
import { fileTypeConvert } from 'src/utils/file-type-convert';

@Controller('document-files')
export class DocumentFilesController {
  constructor(private readonly documentFilesService: DocumentFilesService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload document file',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('document', { storage: storageConfig('documents') }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
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

      const documentFile = await this.documentFilesService.create({
        fileName,
        fileType,
        path,
      });

      return documentFile;
    } catch (error) {
      throw new HttpException(
        'Failed to process uploaded file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  create(@Body() createDocumentFileDto: CreateDocumentFileDto) {
    return this.documentFilesService.create(createDocumentFileDto);
  }

  @Get()
  findAll() {
    return this.documentFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentFilesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentFileDto: UpdateDocumentFileDto,
  ) {
    return this.documentFilesService.update(id, updateDocumentFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentFilesService.remove(id);
  }
}
