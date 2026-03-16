import baseCss from './base.css';
import questionTypesCss from './question-types.css';
import confirmationCss from './confirmation.css';
import brandingCss from './branding.css';
import modalCss from './modal.css';
import popoverCss from './popover.css';

/** All widget CSS concatenated for injection into shadow root */
export const WIDGET_CSS = [
  baseCss,
  questionTypesCss,
  confirmationCss,
  brandingCss,
  modalCss,
  popoverCss,
].join('\n');
