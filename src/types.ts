import type { ReactNode } from 'react';
import type { FdbckError } from './lib/errors';

/** Question type */
export type QuestionType = 'yes_no' | 'single_choice' | 'multiple_choice' | 'rating';

/** Rating scale options as returned by the API */
export interface RatingOptions {
  min: number;
  max: number;
  min_label?: string;
  max_label?: string;
}

/** Question data from GET /v1/f/:token */
export interface QuestionData {
  id: string;
  question: string;
  type: QuestionType;
  options: string[] | RatingOptions;
  theme_color: string | null;
  theme_mode: 'light' | 'dark';
  hide_branding: boolean;
  welcome_message: string | null;
  thank_you_message: string | null;
}

/** Response value submitted by the respondent */
export type ResponseValue = string | string[] | number;

/** Display mode for the widget */
export type FdbckMode = 'inline' | 'modal' | 'popover';

/** Result returned when a response is submitted or dismissed */
export interface FdbckResult {
  status: 'submitted' | 'dismissed';
  value?: ResponseValue;
}

/** Custom locale strings */
export interface FdbckLocale {
  submit?: string;
  poweredBy?: string;
  loading?: string;
  errorTitle?: string;
  errorMessage?: string;
  retry?: string;
  close?: string;
}

/** Style overrides for the widget */
export interface FdbckStyle {
  width?: string;
  maxWidth?: string;
  borderRadius?: string;
  fontFamily?: string;
  fontSize?: string;
}

/** Props for the low-level FdbckWidget component (takes a pre-resolved token) */
export interface FdbckWidgetProps {
  token: string;
  mode?: FdbckMode;
  open?: boolean;
  baseUrl?: string;
  delay?: number;
  autoCloseAfter?: number;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  locale?: FdbckLocale;
  style?: FdbckStyle;
  onSubmit?: (value: ResponseValue) => void;
  onDismiss?: () => void;
  onError?: (error: FdbckError) => void;
  onLoad?: (question: QuestionData) => void;
  children?: ReactNode;
}

/** Props for the FdbckProvider context */
export interface FdbckProviderProps {
  baseUrl?: string;
  locale?: FdbckLocale;
  style?: FdbckStyle;
  children: ReactNode;
}

/** Return type from useFdbck hook */
export interface UseFdbckReturn {
  show: (options: UseFdbckOptions) => Promise<FdbckResult>;
  dismiss: () => void;
  isActive: boolean;
}

/** Options passed to useFdbck().show() */
export type UseFdbckOptions = { token: string } & Omit<FdbckWidgetProps, 'token' | 'onSubmit' | 'onDismiss'>;

/** Token page response from GET /v1/f/:token */
export interface TokenPageResponse {
  status: 'valid' | 'invalid' | 'already_responded' | 'token_expired' | 'question_ended';
  question?: QuestionData;
  token?: string;
  expires_at?: string;
}
