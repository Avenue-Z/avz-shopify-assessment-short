export type QuestionType = "short_text" | "email" | "single_select" | "multi_select";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  section: string;
}

export interface Section {
  id: string;
  title: string;
  questionIds: string[];
}

export type Answers = Record<string, string | string[]>;

export interface ScoreResult {
  definitionConfidence: {
    score: number;
    max: number;
    percent: number;
    band: string;
  };
  complexityRating: {
    score: number;
    max: number;
    band: string;
  };
  migrationReadiness: {
    score: number;
    max: number;
    percent: number;
    band: string;
  };
}

export interface Strength {
  label: string;
  detail: string;
}

export interface Consideration {
  label: string;
  detail: string;
}

export type AssessmentStep = "intro" | "questions" | "results";

export interface AssessmentState {
  step: AssessmentStep;
  currentSectionIndex: number;
  answers: Answers;
  errors: Record<string, string>;
  scores: ScoreResult | null;
}

export type AssessmentAction =
  | { type: "START" }
  | { type: "SET_ANSWER"; questionId: string; value: string | string[] }
  | { type: "NEXT_SECTION" }
  | { type: "PREV_SECTION" }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "CLEAR_ERROR"; questionId: string }
  | { type: "SUBMIT"; scores: ScoreResult };
