"use client";

import { useEffect, useRef } from "react";
import { sections } from "@/data/sections";
import { questionsMap } from "@/data/questions";
import { AssessmentState, Answers } from "@/lib/types";
import { calculateScores } from "@/lib/scoring";
import { submitLead } from "@/lib/submitLead";
import QuestionRenderer from "./QuestionRenderer";

interface WizardShellProps {
  state: AssessmentState;
  setAnswer: (questionId: string, value: string | string[]) => void;
  nextSection: () => void;
  prevSection: () => void;
  setErrors: (errors: Record<string, string>) => void;
  submit: (scores: ReturnType<typeof calculateScores>) => void;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateSection(
  sectionIndex: number,
  answers: Answers
): Record<string, string> {
  const section = sections[sectionIndex];
  const errors: Record<string, string> = {};

  for (const qId of section.questionIds) {
    const question = questionsMap.get(qId);
    if (!question || !question.required) continue;

    const answer = answers[qId];

    if (question.type === "multi_select") {
      if (!Array.isArray(answer) || answer.length === 0) {
        errors[qId] = "Please select at least one option";
      }
    } else if (question.type === "email") {
      if (!answer || typeof answer !== "string" || !answer.trim()) {
        errors[qId] = "This field is required";
      } else if (!validateEmail(answer)) {
        errors[qId] = "Please enter a valid email address";
      }
    } else {
      if (!answer || (typeof answer === "string" && !answer.trim())) {
        errors[qId] = "This field is required";
      }
    }
  }

  return errors;
}

export default function WizardShell({
  state,
  setAnswer,
  nextSection,
  prevSection,
  setErrors,
  submit,
}: WizardShellProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const currentSection = sections[state.currentSectionIndex];
  const isLastSection = state.currentSectionIndex === sections.length - 1;
  const totalSections = sections.length;

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.currentSectionIndex]);

  const handleNext = () => {
    const errors = validateSection(state.currentSectionIndex, state.answers);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      // Scroll to first error
      const firstErrorId = Object.keys(errors)[0];
      const el = document.getElementById(`question-${firstErrorId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (isLastSection) {
      const scores = calculateScores(state.answers);
      submitLead(state.answers, scores);
      submit(scores);
    } else {
      nextSection();
    }
  };

  const handleBack = () => {
    prevSection();
  };

  const progress =
    ((state.currentSectionIndex + 1) / totalSections) * 100;

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-12">
      <div ref={topRef} />

      {/* Progress bar */}
      <div className="mb-2 flex items-center justify-between text-sm text-text-muted">
        <span>
          Section {state.currentSectionIndex + 1} of {totalSections}
        </span>
        <span>{currentSection.title}</span>
      </div>
      <div
        className="mb-10 h-1 w-full overflow-hidden rounded-full"
        style={{ background: "#1a1a1a" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)",
          }}
        />
      </div>

      {/* Section title */}
      <h2 className="mb-8 text-2xl font-800 text-white">
        {currentSection.title}
      </h2>

      {/* Questions */}
      {currentSection.questionIds.map((qId) => {
        const question = questionsMap.get(qId);
        if (!question) return null;
        return (
          <div key={qId} id={`question-${qId}`}>
            <QuestionRenderer
              question={question}
              value={state.answers[qId]}
              error={state.errors[qId] || ""}
              onChange={setAnswer}
            />
          </div>
        );
      })}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        {state.currentSectionIndex > 0 ? (
          <button
            onClick={handleBack}
            className="cursor-pointer border-none px-6 py-3 text-sm font-700 text-white"
            style={{
              background: "#3a3a3a",
              borderRadius: 9999,
            }}
          >
            Back
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={handleNext}
          className="cursor-pointer border-none px-8 py-[14px] text-sm font-800 uppercase tracking-[0.06em] text-black"
          style={{
            background:
              "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF)",
            borderRadius: 9999,
          }}
        >
          {isLastSection ? "See My Results" : "Continue"}
        </button>
      </div>
    </div>
  );
}
