import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const validateFileUpload = (fileType: string) => {
  return new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType }),
      new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 }),
    ],
  });
};
