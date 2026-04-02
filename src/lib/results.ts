import { Answers, ScoreResult, Strength, Consideration } from "./types";

export function generateSummary(
  answers: Answers,
  scores: ScoreResult
): string {
  const brand =
    typeof answers["Q1"] === "string" && answers["Q1"].trim()
      ? answers["Q1"].trim()
      : "Your team";

  const { migrationReadiness, complexityRating } = scores;

  let readinessDesc: string;
  if (migrationReadiness.percent >= 80) readinessDesc = "ready to scope";
  else if (migrationReadiness.percent >= 60)
    readinessDesc = "in discovery phase";
  else if (migrationReadiness.percent >= 40) readinessDesc = "in early planning";
  else readinessDesc = "in the foundational stages";

  const complexityDesc = complexityRating.band.toLowerCase();

  return `${brand}'s team appears ${readinessDesc} with ${complexityDesc} complexity. A few important requirements may still need to be clarified before accurate scoping can begin.`;
}

export function generateStrengths(
  answers: Answers,
  scores: ScoreResult
): Strength[] {
  const strengths: Strength[] = [];

  if (scores.migrationReadiness.percent >= 60) {
    strengths.push({
      label: "Migration readiness",
      detail: `Your team is ${scores.migrationReadiness.band.toLowerCase()} with strong organizational alignment.`,
    });
  }

  if (scores.definitionConfidence.percent >= 60) {
    strengths.push({
      label: "Requirements clarity",
      detail: `Your migration requirements are ${scores.definitionConfidence.band.toLowerCase()}, reducing discovery time.`,
    });
  }

  if (scores.complexityRating.score <= 2) {
    strengths.push({
      label: "Manageable complexity",
      detail:
        "Your setup has low complexity, which typically means a faster migration timeline.",
    });
  }

  const q7 = typeof answers["Q7"] === "string" ? answers["Q7"] : "";
  if (q7 === "0–3 months" || q7 === "3–6 months") {
    strengths.push({
      label: "Clear timeline",
      detail:
        "Having a defined launch window helps drive focus and accountability.",
    });
  }

  const q13 = typeof answers["Q13"] === "string" ? answers["Q13"] : "";
  if (q13 === "Yes") {
    strengths.push({
      label: "Budget approved",
      detail:
        "Approved budget removes one of the biggest blockers to project kickoff.",
    });
  }

  const q16 = typeof answers["Q16"] === "string" ? answers["Q16"] : "";
  if (q16 === "High confidence") {
    strengths.push({
      label: "High confidence in data quality",
      detail:
        "Strong data quality reduces cleanup effort and accelerates migration timelines.",
    });
  }

  const q15 = typeof answers["Q15"] === "string" ? answers["Q15"] : "";
  if (q15 === "Yes") {
    strengths.push({
      label: "SEO/AEO planning",
      detail:
        "Having SEO and AEO migration plans in place protects organic traffic during transition.",
    });
  }

  return strengths.slice(0, 3);
}

export function generateConsiderations(
  answers: Answers,
  scores: ScoreResult
): Consideration[] {
  const considerations: Consideration[] = [];

  if (scores.complexityRating.score >= 5) {
    considerations.push({
      label: "High integration complexity",
      detail:
        "Multiple systems and complex checkout setups require careful architecture planning.",
    });
  }

  if (scores.definitionConfidence.percent < 60) {
    considerations.push({
      label: "Requirements need definition",
      detail:
        "Investing time in documenting requirements upfront will prevent scope creep and delays.",
    });
  }

  if (scores.migrationReadiness.percent < 60) {
    considerations.push({
      label: "Team and budget alignment",
      detail:
        "Securing team commitment and budget approval are critical next steps before scoping.",
    });
  }

  const q16 = typeof answers["Q16"] === "string" ? answers["Q16"] : "";
  if (q16 === "Low confidence" || q16 === "Unsure") {
    considerations.push({
      label: "Data quality concerns",
      detail:
        "Auditing and cleaning customer, product, and order data before migration is essential.",
    });
  }

  const q15 = typeof answers["Q15"] === "string" ? answers["Q15"] : "";
  if (q15 !== "Yes") {
    considerations.push({
      label: "SEO/AEO migration planning",
      detail:
        "Without a plan, you risk losing organic traffic and search rankings during migration.",
    });
  }

  const q13 = typeof answers["Q13"] === "string" ? answers["Q13"] : "";
  if (q13 === "No" || q13 === "Unsure") {
    considerations.push({
      label: "Budget not yet secured",
      detail:
        "Budget approval is often the longest lead-time item — start the conversation early.",
    });
  }

  return considerations.slice(0, 3);
}
