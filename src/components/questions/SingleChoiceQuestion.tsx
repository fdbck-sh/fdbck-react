import { useState } from 'react';

interface SingleChoiceQuestionProps {
  options: string[];
  disabled: boolean;
  onSubmit: (value: string) => void;
}

/** Vertical list with radio dots, immediate submit on click */
export function SingleChoiceQuestion({ options, disabled, onSubmit }: SingleChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleClick(opt: string) {
    setSelected(opt);
    onSubmit(opt);
  }

  return (
    <div className="fdbck-choice-list">
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <button
            key={opt}
            className="fdbck-option-btn"
            data-selected={isSelected}
            disabled={disabled}
            onClick={() => handleClick(opt)}
          >
            <span className="fdbck-radio" data-selected={isSelected}>
              {isSelected && <span className="fdbck-radio-dot" />}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}
