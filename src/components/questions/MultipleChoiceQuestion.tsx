import { useState } from 'react';
import type { FdbckLocale } from '../../types';

interface MultipleChoiceQuestionProps {
  options: string[];
  disabled: boolean;
  locale: Required<FdbckLocale>;
  onSubmit: (value: string[]) => void;
}

/** Vertical list with checkboxes, deferred submit via button */
export function MultipleChoiceQuestion({ options, disabled, locale, onSubmit }: MultipleChoiceQuestionProps) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(opt: string) {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  }

  return (
    <div className="fdbck-choice-list">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            className="fdbck-option-btn"
            data-selected={isSelected}
            disabled={disabled}
            onClick={() => toggle(opt)}
          >
            <span className="fdbck-checkbox" data-selected={isSelected}>
              {isSelected && (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            {opt}
          </button>
        );
      })}
      <button
        className="fdbck-submit-btn"
        disabled={disabled || selected.length === 0}
        onClick={() => onSubmit(selected)}
      >
        {locale.submit}
      </button>
    </div>
  );
}
