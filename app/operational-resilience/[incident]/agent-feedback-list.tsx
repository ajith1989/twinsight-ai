"use client";

import { useEffect, useState } from "react";
import AgentFeedback from "./agent-feedback";
import { Recommendation } from "@/config/type";
import { FeedbackLoading } from "./loading-feedback";

const LOADING_DELAY = 2000; // 2 seconds between each reveal

export default function AgentFeedbackList({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (visibleCount < recommendations.length) {
      const timer = setTimeout(() => {
        // After delay, hide skeleton and show next feedback
        setShowSkeleton(false);

        // Wait a tiny bit to switch back to skeleton for next item
        setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
          setShowSkeleton(true);
        }, 100); // short pause to transition
      }, LOADING_DELAY);

      return () => clearTimeout(timer);
    }
  }, [visibleCount, recommendations.length]);

  return (
    <div className="flex flex-col space-y-4 py-2">
      {/* Render all visible feedback */}
      {recommendations.slice(0, visibleCount).map((rec) => (
        <AgentFeedback key={rec.id} recommendation={rec} />
      ))}

      {/* Show skeleton only if there are more feedbacks to reveal */}
      {visibleCount < recommendations.length && showSkeleton && <FeedbackLoading text={recommendations[visibleCount].agentType} />}
    </div>
  );
}
