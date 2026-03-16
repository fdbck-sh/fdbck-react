interface YesNoQuestionProps {
  options: string[];
  disabled: boolean;
  onSubmit: (value: string) => void;
}

/** Two-column grid, immediate submit on click */
export function YesNoQuestion({ options, disabled, onSubmit }: YesNoQuestionProps) {
  return (
    <div className="fdbck-yesno-grid">
      {options.map((opt) => (
        <button
          key={opt}
          className="fdbck-option-btn"
          disabled={disabled}
          onClick={() => onSubmit(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
