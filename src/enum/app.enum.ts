export enum QuestionTypeEnum {
  SingleChoice = 'singleChoice',
  MultipleChoice = 'multipleChoice',
  Bool = 'bool',
  Linker = 'linker',
  Ordered = 'ordered',
  Fill = 'fill',
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
