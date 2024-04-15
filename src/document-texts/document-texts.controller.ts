import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentTextsService } from './document-texts.service';
import { CreateDocumentTextDto } from './dto/create-document-text.dto';
import { UpdateDocumentTextDto } from './dto/update-document-text.dto';

@Controller('document-texts')
export class DocumentTextsController {
  constructor(private readonly documentTextsService: DocumentTextsService) {}

  @Post()
  create(@Body() createDocumentTextDto: CreateDocumentTextDto) {
    return this.documentTextsService.create(createDocumentTextDto);
  }

  @Get()
  findAll() {
    return this.documentTextsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentTextsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentTextDto: UpdateDocumentTextDto,
  ) {
    return this.documentTextsService.update(id, updateDocumentTextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentTextsService.remove(id);
  }
}
