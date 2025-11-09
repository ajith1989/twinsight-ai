"use client";

import { useEffect, useState } from "react";
import { Recommendation } from "@/config/type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WandSparkles } from "lucide-react";

export default function AgentFeedback({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const fullText = recommendation?.recommendation ?? "";
    if (!fullText) return;

    let index = 0;
    let cancelled = false;
    setDisplayText(""); // reset on new recommendation

    const typeNext = () => {
      if (cancelled) return;

      // show string up to current index
      setDisplayText(fullText.slice(0, index + 1));
      index += 1;

      if (index < fullText.length) {
        setTimeout(typeNext, 10); // typing speed
      }
    };

    // start typing
    typeNext();

    return () => {
      cancelled = true;
    };
  }, [recommendation?.recommendation]);

  return (
    <Alert>
      <WandSparkles className="animate-pulse" />
      <AlertTitle className="pb-2">{recommendation.agentType}</AlertTitle>
      <AlertDescription>{displayText}</AlertDescription>
    </Alert>
  );
}
