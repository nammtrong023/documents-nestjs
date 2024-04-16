import { FileTypeEnum } from 'src/common/enum/app.enum';

export function fileTypeConvert(mimetype: string) {
  const prefix = 'application/vnd.openxmlformats-officedocument';
  let fileType = '';

  switch (mimetype) {
    case 'image/jpeg':
    case 'image/png':
      fileType = FileTypeEnum.IMG;
      break;
    case 'image/gif':
      fileType = FileTypeEnum.GIF;
      break;
    case 'video/mp4':
      fileType = FileTypeEnum.VID;
      break;
    case 'application/pdf':
      fileType = FileTypeEnum.PDF;
      break;
    case `${prefix}.wordprocessingml.document`:
      fileType = FileTypeEnum.DOC;
      break;
    case `${prefix}.presentationml.presentation`:
      fileType = FileTypeEnum.PPT;
      break;
    case `${prefix}.spreadsheetml.sheet`:
      fileType = FileTypeEnum.SHEET;
      break;
    default:
      fileType = FileTypeEnum.UNKNOWN;
  }

  return fileType;
}
