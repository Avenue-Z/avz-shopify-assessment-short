import { Answers, ScoreResult } from "./types";

// TODO: Replace with actual Google Apps Script Web App URL
// 1. Create a Google Apps Script that accepts POST requests and writes to a Google Sheet
// 2. Deploy as Web App (Execute as: Me, Who has access: Anyone)
// 3. Paste the deployed URL below
const GOOGLE_SHEETS_ENDPOINT = "";

export async function submitLead(
  answers: Answers,
  scores: ScoreResult
): Promise<void> {
  const leadData = {
    timestamp: new Date().toISOString(),
    brand: answers["Q1"] || "",
    businessModel: answers["Q2"] || "",
    currentPlatform: answers["Q3"] || "",
    annualRevenue: answers["Q4"] || "",
    fullName: answers["QA"] || "",
    email: answers["QB"] || "",
    resultPreference: answers["QC"] || "",
    definitionConfidence: scores.definitionConfidence.percent,
    definitionBand: scores.definitionConfidence.band,
    complexityScore: scores.complexityRating.score,
    complexityBand: scores.complexityRating.band,
    migrationReadiness: scores.migrationReadiness.percent,
    readinessBand: scores.migrationReadiness.band,
  };

  // Log lead data for debugging
  console.log("[Lead Submission]", leadData);

  if (!GOOGLE_SHEETS_ENDPOINT) {
    console.warn(
      "[Lead Submission] No Google Sheets endpoint configured. Skipping submission."
    );
    return;
  }

  try {
    await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
      mode: "no-cors",
    });
  } catch (error) {
    console.error("[Lead Submission] Failed to submit lead:", error);
  }
}
