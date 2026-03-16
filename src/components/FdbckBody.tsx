import type { QuestionData, ResponseValue, RatingOptions, FdbckLocale } from '../types';
import { YesNoQuestion } from './questions/YesNoQuestion';
import { SingleChoiceQuestion } from './questions/SingleChoiceQuestion';
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion';
import { RatingQuestion } from './questions/RatingQuestion';

interface FdbckBodyProps {
  question: QuestionData;
  disabled: boolean;
  locale: Required<FdbckLocale>;
  onSubmit: (value: ResponseValue) => void;
}

/** Switches on question.type and renders the appropriate input component */
export function FdbckBody({ question, disabled, locale, onSubmit }: FdbckBodyProps) {
  switch (question.type) {
    case 'yes_no':
      return <YesNoQuestion options={question.options as string[]} disabled={disabled} onSubmit={onSubmit} />;
    case 'single_choice':
      return <SingleChoiceQuestion options={question.options as string[]} disabled={disabled} onSubmit={onSubmit} />;
    case 'multiple_choice':
      return <MultipleChoiceQuestion options={question.options as string[]} disabled={disabled} locale={locale} onSubmit={onSubmit} />;
    case 'rating':
      return <RatingQuestion options={question.options as RatingOptions} disabled={disabled} onSubmit={onSubmit} />;
    default:
      return null;
  }
}
