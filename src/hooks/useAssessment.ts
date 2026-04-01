"use client";

import { useReducer, useCallback } from "react";
import { AssessmentState, AssessmentAction, ScoreResult } from "@/lib/types";

const initialState: AssessmentState = {
  step: "intro",
  currentSectionIndex: 0,
  answers: {},
  errors: {},
  scores: null,
};

function reducer(
  state: AssessmentState,
  action: AssessmentAction
): AssessmentState {
  switch (action.type) {
    case "START":
      return { ...state, step: "questions", currentSectionIndex: 0 };
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
        errors: { ...state.errors, [action.questionId]: "" },
      };
    case "NEXT_SECTION":
      return { ...state, currentSectionIndex: state.currentSectionIndex + 1 };
    case "PREV_SECTION":
      return {
        ...state,
        currentSectionIndex: Math.max(0, state.currentSectionIndex - 1),
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "CLEAR_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.questionId]: "" },
      };
    case "SUBMIT":
      return { ...state, step: "results", scores: action.scores };
    default:
      return state;
  }
}

export function useAssessment() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = useCallback(() => dispatch({ type: "START" }), []);

  const setAnswer = useCallback(
    (questionId: string, value: string | string[]) =>
      dispatch({ type: "SET_ANSWER", questionId, value }),
    []
  );

  const nextSection = useCallback(
    () => dispatch({ type: "NEXT_SECTION" }),
    []
  );

  const prevSection = useCallback(
    () => dispatch({ type: "PREV_SECTION" }),
    []
  );

  const setErrors = useCallback(
    (errors: Record<string, string>) =>
      dispatch({ type: "SET_ERRORS", errors }),
    []
  );

  const submit = useCallback(
    (scores: ScoreResult) => dispatch({ type: "SUBMIT", scores }),
    []
  );

  return {
    state,
    start,
    setAnswer,
    nextSection,
    prevSection,
    setErrors,
    submit,
  };
}
