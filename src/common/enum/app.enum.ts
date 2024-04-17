export enum QuestionTypeEnum {
  SingleChoice = 'singleChoice',
  MultipleChoice = 'multipleChoice',
  Bool = 'bool',
  Linker = 'linker',
  Ordered = 'ordered',
  FillBlank = 'fillBlank',
  Pick = 'pick',
  Open = 'open',
  VideoPitch = 'videoPitch',
  ScreenCast = 'screenCast',
}

export enum DocumentEnum {
  DocumentFile = 'DocumentFile',
  DocumentText = 'DocumentText',
  DocumentQuestion = 'DocumentQuestion',
}

export enum ResponseMethodEnum {
  Screenshot = 'screenshot',
  ScreenshotAndWebcam = 'screenshotAndWebcam',
  Write = 'write',
  SubmitDocs = 'submitDocs',
  WriteAndSubmitDocs = 'writeAndSubmitDocs',
}

export enum CorrectionMethodEnum {
  Instructors = 'instructors',
  LeanersManager = 'leanersManager',
}


export enum FileTypeEnum {
  IMG = 'IMG',
  GIF = 'GID',
  VID = 'VID',
  PDF = 'PDF',
  DOC = 'DOC',
  PPT = 'PPT',
  SHEET = 'SHEET',
  UNKNOWN = 'UNKNOWN',
}
