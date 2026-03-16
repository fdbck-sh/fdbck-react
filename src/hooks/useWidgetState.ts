import { useReducer } from 'react';
import type { QuestionData, ResponseValue } from '../types';
import type { FdbckError } from '../lib/errors';

export type WidgetStatus = 'fetching_token' | 'loading' | 'ready' | 'submitting' | 'complete' | 'error';

export interface WidgetState {
  status: WidgetStatus;
  question: QuestionData | null;
  token: string | null;
  error: FdbckError | null;
  submittedValue: ResponseValue | null;
}

type WidgetAction =
  | { type: 'TOKEN_RESOLVED'; token: string }
  | { type: 'LOADED'; question: QuestionData; token: string }
  | { type: 'SUBMITTING' }
  | { type: 'COMPLETE'; value: ResponseValue }
  | { type: 'ERROR'; error: FdbckError }
  | { type: 'RESET' };

function reducer(state: WidgetState, action: WidgetAction): WidgetState {
  switch (action.type) {
    case 'TOKEN_RESOLVED':
      return { ...state, status: 'loading', token: action.token };
    case 'LOADED':
      return { ...state, status: 'ready', question: action.question, token: action.token };
    case 'SUBMITTING':
      return { ...state, status: 'submitting' };
    case 'COMPLETE':
      return { ...state, status: 'complete', submittedValue: action.value };
    case 'ERROR':
      return { ...state, status: 'error', error: action.error };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const initialState: WidgetState = {
  status: 'loading',
  question: null,
  token: null,
  error: null,
  submittedValue: null,
};

const fetchingTokenState: WidgetState = {
  ...initialState,
  status: 'fetching_token',
};

/** State machine for widget lifecycle */
export function useWidgetState(needsTokenFetch: boolean) {
  return useReducer(reducer, needsTokenFetch ? fetchingTokenState : initialState);
}
