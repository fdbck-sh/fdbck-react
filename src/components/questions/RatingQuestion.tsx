import { useState } from 'react';
import type { RatingOptions } from '../../types';

interface RatingQuestionProps {
  options: RatingOptions;
  disabled: boolean;
  onSubmit: (value: number) => void;
}

/** Number grid with min/max labels, immediate submit on click */
export function RatingQuestion({ options, disabled, onSubmit }: RatingQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const count = options.max - options.min + 1;
  const columns = Math.min(count, 10);

  function handleClick(v: number) {
    setSelected(v);
    onSubmit(v);
  }

  return (
    <div>
      <div className="fdbck-rating-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: count }, (_, i) => options.min + i).map((v) => (
          <button
            key={v}
            className="fdbck-rating-btn"
            data-selected={selected === v}
            disabled={disabled}
            onClick={() => handleClick(v)}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="fdbck-rating-labels">
        <span>{options.min_label || options.min}</span>
        <span>{options.max_label || options.max}</span>
      </div>
    </div>
  );
}
