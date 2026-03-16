interface FdbckConfirmationProps {
  thankYouMessage: string | null;
}

/** Checkmark + thank-you message shown after submission */
export function FdbckConfirmation({ thankYouMessage }: FdbckConfirmationProps) {
  return (
    <div className="fdbck-confirmation">
      <div className="fdbck-check-circle">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2>{thankYouMessage ? 'Thank you' : 'Response recorded'}</h2>
      <p>{thankYouMessage || 'Your response has been recorded. You can close this.'}</p>
    </div>
  );
}
