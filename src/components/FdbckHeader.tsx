import type { QuestionData } from '../types';

interface FdbckHeaderProps {
  question: QuestionData;
}

/** Welcome message + question text */
export function FdbckHeader({ question }: FdbckHeaderProps) {
  return (
    <>
      {question.welcome_message && (
        <p className="fdbck-welcome">{question.welcome_message}</p>
      )}
      <h1 className="fdbck-question">{question.question}</h1>
    </>
  );
}
