export function fileTypeConvert(mimetype: string) {
  const prefix = 'application/vnd.openxmlformats-officedocument';
  let fileType = '';

  switch (mimetype) {
    case 'image/jpeg':
    case 'image/png':
      fileType = 'IMG';
      break;
    case 'image/gif':
      fileType = 'GIF';
      break;
    case 'video/mp4':
      fileType = 'VID';
      break;
    case 'application/pdf':
      fileType = 'PDF';
      break;
    case `${prefix}.wordprocessingml.document`:
      fileType = 'DOC';
      break;
    case `${prefix}.presentationml.presentation`:
      fileType = 'PPT';
      break;
    case `${prefix}.spreadsheetml.sheet`:
      fileType = 'SHEET';
      break;
    default:
      fileType = 'UNKNOWN';
  }

  return fileType;
}
