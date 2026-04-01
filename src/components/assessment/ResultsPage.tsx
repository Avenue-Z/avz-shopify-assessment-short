"use client";

import { Answers, ScoreResult } from "@/lib/types";
import {
  generateSummary,
  generateStrengths,
  generateConsiderations,
} from "@/lib/results";

interface ResultsPageProps {
  answers: Answers;
  scores: ScoreResult;
}

function ScoreCard({
  label,
  value,
  band,
  color,
}: {
  label: string;
  value: string;
  band: string;
  color: string;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "#272727",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.06)",
        padding: 24,
      }}
    >
      <div
        className="absolute left-0 right-0 top-0"
        style={{
          height: 2,
          background:
            "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)",
        }}
      />
      <p className="mb-1 text-sm font-700 uppercase tracking-[0.06em] text-text-muted">
        {label}
      </p>
      <p className="text-3xl font-900" style={{ color }}>
        {value}
      </p>
      <p className="mt-1 text-sm text-text-muted">{band}</p>
    </div>
  );
}

export default function ResultsPage({ answers, scores }: ResultsPageProps) {
  const summary = generateSummary(answers, scores);
  const strengths = generateStrengths(answers, scores);
  const considerations = generateConsiderations(answers, scores);

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-12">
      {/* Header */}
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.06em] text-text-muted">
        Your Results
      </p>
      <h1
        className="mb-6 text-3xl font-800 leading-tight md:text-4xl"
        style={{
          background:
            "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Migration Readiness Scorecard
      </h1>
      <div
        className="mb-8 w-full"
        style={{
          height: 1,
          background:
            "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)",
        }}
      />

      {/* Summary */}
      <p className="mb-10 text-lg leading-relaxed text-text-muted">
        {summary}
      </p>

      {/* Score Cards */}
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <ScoreCard
          label="Definition Confidence"
          value={`${scores.definitionConfidence.percent}%`}
          band={scores.definitionConfidence.band}
          color="#60FDFF"
        />
        <ScoreCard
          label="Complexity Rating"
          value={scores.complexityRating.band}
          band={`${scores.complexityRating.score} / ${scores.complexityRating.max} pts`}
          color="#FFFC60"
        />
        <ScoreCard
          label="Migration Readiness"
          value={`${scores.migrationReadiness.percent}%`}
          band={scores.migrationReadiness.band}
          color="#60FF80"
        />
      </div>

      {/* Strengths & Considerations */}
      <div className="mb-10 grid gap-6 md:grid-cols-2">
        {strengths.length > 0 && (
          <div
            style={{
              background: "#272727",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              padding: 24,
            }}
          >
            <h3 className="mb-4 text-lg font-800 text-brand-green">
              Top Strengths
            </h3>
            <ul className="space-y-4">
              {strengths.map((s, i) => (
                <li key={i}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-brand-green font-bold">+</span>
                    <div>
                      <p className="font-700 text-white">{s.label}</p>
                      <p className="text-sm text-text-muted">{s.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {considerations.length > 0 && (
          <div
            style={{
              background: "#272727",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              padding: 24,
            }}
          >
            <h3 className="mb-4 text-lg font-800 text-brand-yellow">
              Key Considerations
            </h3>
            <ul className="space-y-4">
              {considerations.map((c, i) => (
                <li key={i}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-yellow-400 font-bold">!</span>
                    <div>
                      <p className="font-700 text-white">{c.label}</p>
                      <p className="text-sm text-text-muted">{c.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      <div
        className="text-center"
        style={{
          background: "#272727",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 24px",
        }}
      >
        <button
          onClick={() =>
            window.open("https://avenuez.com/contact", "_blank")
          }
          className="mb-4 inline-block cursor-pointer border-none px-8 py-[14px] text-sm font-800 uppercase tracking-[0.06em] text-black"
          style={{
            background:
              "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF)",
            borderRadius: 9999,
          }}
        >
          Talk to a Migration Architect
        </button>
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-text-muted">
          Every successful migration starts with understanding. Whether
          you&apos;re ready to scope now or need help clarifying requirements
          we&apos;ll guide you through the preparation process to ensure a
          smooth transition to Shopify.
        </p>
      </div>
    </div>
  );
}
