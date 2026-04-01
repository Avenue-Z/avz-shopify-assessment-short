import { Answers, ScoreResult } from "./types";

function getAnswer(answers: Answers, id: string): string {
  const val = answers[id];
  return typeof val === "string" ? val : "";
}

function getMultiAnswer(answers: Answers, id: string): string[] {
  const val = answers[id];
  return Array.isArray(val) ? val : [];
}

function calcDefinitionConfidence(answers: Answers) {
  let score = 0;
  const max = 6;

  // Q14
  const q14 = getAnswer(answers, "Q14");
  if (q14 === "Fully documented") score += 2;
  else if (q14 === "Partially documented") score += 1;

  // Q15
  const q15 = getAnswer(answers, "Q15");
  if (q15 === "Yes") score += 2;

  // Q16
  const q16 = getAnswer(answers, "Q16");
  if (q16 === "High confidence") score += 2;
  else if (q16 === "Moderate confidence") score += 1;

  const percent = Math.round((score / max) * 100);
  let band: string;
  if (percent >= 80) band = "Clearly defined";
  else if (percent >= 60) band = "Mostly defined";
  else if (percent >= 40) band = "Several unknowns";
  else band = "Needs definition";

  return { score, max, percent, band };
}

function calcComplexityRating(answers: Answers) {
  let score = 0;
  const max = 8;

  // Q8
  const q8 = getAnswer(answers, "Q8");
  if (q8.startsWith("Yes complex")) score += 2;
  else if (q8.startsWith("Yes a few")) score += 1;

  // Q9 - 6 scorable items (exclude "None of the above")
  const q9 = getMultiAnswer(answers, "Q9");
  const q9Scorable = q9.filter((v) => v !== "None of the above");
  const q9Normalized = (q9Scorable.length / 6) * 2;
  if (q9Normalized >= 1.3) score += 2;
  else if (q9Normalized >= 0.4) score += 1;

  // Q10 - 8 scorable items (exclude "Other")
  const q10 = getMultiAnswer(answers, "Q10");
  const q10Scorable = q10.filter((v) => v !== "Other");
  const q10Normalized = (q10Scorable.length / 8) * 2;
  if (q10Normalized >= 1.3) score += 2;
  else if (q10Normalized >= 0.4) score += 1;

  // Q11
  const q11 = getAnswer(answers, "Q11");
  if (q11.startsWith("Complex")) score += 2;
  else if (q11.startsWith("Moderate")) score += 1;

  let band: string;
  if (score >= 7) band = "Extensive";
  else if (score >= 5) band = "High";
  else if (score >= 3) band = "Moderate";
  else band = "Low";

  return { score, max, band };
}

function calcMigrationReadiness(answers: Answers) {
  let score = 0;
  const max = 6;

  // Q7
  const q7 = getAnswer(answers, "Q7");
  if (q7 === "0–3 months" || q7 === "3–6 months") score += 2;
  else if (q7 === "6–12 months") score += 1;

  // Q12
  const q12 = getAnswer(answers, "Q12");
  if (q12 === "We have a team budget and requirements in place") score += 2;
  else if (
    q12 ===
    "We have a team and budget but requirements are still being defined"
  )
    score += 1;

  // Q13
  const q13 = getAnswer(answers, "Q13");
  if (q13 === "Yes") score += 2;
  else if (q13 === "In progress") score += 1;

  const percent = Math.round((score / max) * 100);
  let band: string;
  if (percent >= 80) band = "Ready to scope now";
  else if (percent >= 60) band = "Discovery-ready";
  else if (percent >= 40) band = "Early planning stage";
  else band = "Foundational work needed";

  return { score, max, percent, band };
}

export function calculateScores(answers: Answers): ScoreResult {
  return {
    definitionConfidence: calcDefinitionConfidence(answers),
    complexityRating: calcComplexityRating(answers),
    migrationReadiness: calcMigrationReadiness(answers),
  };
}
