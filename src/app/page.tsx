"use client";

import { useAssessment } from "@/hooks/useAssessment";
import IntroScreen from "@/components/assessment/IntroScreen";
import WizardShell from "@/components/assessment/WizardShell";
import ResultsPage from "@/components/assessment/ResultsPage";

export default function Home() {
  const { state, start, setAnswer, nextSection, prevSection, setErrors, submit } =
    useAssessment();

  if (state.step === "intro") {
    return <IntroScreen onStart={start} />;
  }

  if (state.step === "results" && state.scores) {
    return <ResultsPage answers={state.answers} scores={state.scores} />;
  }

  return (
    <WizardShell
      state={state}
      setAnswer={setAnswer}
      nextSection={nextSection}
      prevSection={prevSection}
      setErrors={setErrors}
      submit={submit}
    />
  );
}
