"use client";

import { Question } from "@/lib/types";

interface QuestionRendererProps {
  question: Question;
  value: string | string[] | undefined;
  error: string;
  onChange: (questionId: string, value: string | string[]) => void;
}

export default function QuestionRenderer({
  question,
  value,
  error,
  onChange,
}: QuestionRendererProps) {
  const handleTextChange = (val: string) => {
    onChange(question.id, val);
  };

  const handleSingleSelect = (option: string) => {
    onChange(question.id, option);
  };

  const handleMultiSelect = (option: string) => {
    const current = Array.isArray(value) ? value : [];

    if (option === "None of the above") {
      onChange(question.id, current.includes(option) ? [] : [option]);
      return;
    }

    const filtered = current.filter((v) => v !== "None of the above");

    if (filtered.includes(option)) {
      onChange(
        question.id,
        filtered.filter((v) => v !== option)
      );
    } else {
      onChange(question.id, [...filtered, option]);
    }
  };

  return (
    <div className="mb-8">
      <label className="mb-4 block text-lg font-700 text-white">
        {question.text}
        {question.required && (
          <span className="ml-1 text-brand-cyan">*</span>
        )}
      </label>

      {(question.type === "short_text" || question.type === "email") && (
        <input
          type={question.type === "email" ? "email" : "text"}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={
            question.type === "email"
              ? "you@company.com"
              : "Type your answer..."
          }
          className="w-full text-white placeholder:text-text-muted focus:outline-none"
          style={{
            background: "#272727",
            border: error
              ? "1px solid #ff6060"
              : "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "14px 18px",
            fontSize: 16,
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = "#60FDFF";
              e.target.style.boxShadow =
                "0 0 0 2px rgba(96,253,255,0.15)";
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = "rgba(255,255,255,0.1)";
              e.target.style.boxShadow = "none";
            }
          }}
        />
      )}

      {question.type === "single_select" && question.options && (
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const selected = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSingleSelect(option)}
                className="w-full cursor-pointer text-left text-white transition-all duration-150"
                style={{
                  background: selected ? "#333333" : "#272727",
                  border: selected
                    ? "1px solid #60FDFF"
                    : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "14px 18px",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "multi_select" && question.options && (
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const current = Array.isArray(value) ? value : [];
            const selected = current.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleMultiSelect(option)}
                className="flex w-full cursor-pointer items-center gap-3 text-left text-white transition-all duration-150"
                style={{
                  background: selected ? "#333333" : "#272727",
                  border: selected
                    ? "1px solid #60FDFF"
                    : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "14px 18px",
                }}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded"
                  style={{
                    border: selected
                      ? "1px solid #60FDFF"
                      : "1px solid rgba(255,255,255,0.2)",
                    background: selected
                      ? "rgba(96,253,255,0.15)"
                      : "transparent",
                  }}
                >
                  {selected && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="#60FDFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm" style={{ color: "#ff6060" }}>
          {error}
        </p>
      )}
    </div>
  );
}
