"use client";

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.06em] text-text-muted">
          Avenue Z
        </p>
        <h1
          className="mb-6 text-4xl font-800 leading-tight md:text-5xl"
          style={{
            background:
              "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Shopify Migration Readiness Assessment
        </h1>
        <div
          className="mx-auto mb-8 w-full max-w-md"
          style={{
            height: 1,
            background:
              "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)",
          }}
        />
        <p className="mb-10 text-lg leading-relaxed text-text-muted">
          Answer 20 quick questions to evaluate your readiness for a Shopify
          migration. You&apos;ll receive a personalized scorecard with
          actionable next steps.
        </p>
        <button
          onClick={onStart}
          className="inline-block cursor-pointer border-none px-8 py-[14px] text-sm font-800 uppercase tracking-[0.06em] text-black"
          style={{
            background:
              "linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF)",
            borderRadius: 9999,
          }}
        >
          Start Assessment
        </button>
        <p className="mt-6 text-sm text-text-muted">
          Takes about 3–5 minutes
        </p>
      </div>
    </div>
  );
}
