import { QuestionTypeEnum } from 'src/enum/app.enum';

export type BoolOptions = {
  type: QuestionTypeEnum.Bool;
};

export type SingleChoiceOptions = {
  text: string;
  index: number;
};

export type SingleChoiceAnswer = {
  text: string;
  index: number;
};

export type MultipleChoiceOptions = {
  text: string;
  index: number;
};

export type MultipleChoiceAnswer = {
  text: string;
  index: number;
};

export type LinkerOptions = {
  leftText: string;
  rightText: string;
  index: number;
};

export type LinkerAnswers = {
  leftText: string;
  rightText: string;
  index: number;
};

export type OptionsType =
  | BoolOptions
  | SingleChoiceOptions
  | MultipleChoiceOptions
  | LinkerOptions;
