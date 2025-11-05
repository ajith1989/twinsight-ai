"use client";

import { useEffect, useState } from "react";
import { Recommendation } from "@/config/type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, Sparkles, WandSparkles } from "lucide-react";

export default function AgentFeedback({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const fullText = recommendation?.recommendation ?? "";
    if (!fullText) return;

    setDisplayText("");
    let i = 0;

    const interval = setInterval(() => {
      // ✅ Check index before using it
      if (i >= fullText.length) {
        clearInterval(interval);
        return;
      }

      setDisplayText((prev) => prev + fullText.charAt(i));
      i++;
    }, 10); // ⏱ Adjust typing speed (ms per character)

    return () => clearInterval(interval);
  }, [recommendation?.recommendation]);

  return (
    <Alert>
      <WandSparkles className="animate-pulse" />
      <AlertTitle className="pb-2">{recommendation.agentType}</AlertTitle>
      <AlertDescription>{displayText}</AlertDescription>
    </Alert>
  );
}
