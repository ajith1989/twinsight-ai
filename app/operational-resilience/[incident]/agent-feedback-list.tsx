"use client";

import { useEffect, useRef, useState } from "react";
import AgentFeedback from "./agent-feedback";
import { Recommendation } from "@/config/type";
import { FeedbackLoading } from "./loading-feedback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

const LOADING_DELAY = 1000;

export default function AgentFeedbackList({
  recommendations,
  suggestion,
}: {
  recommendations: Recommendation[];
  suggestion: string;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [openItems, setOpenItems] = useState<string[]>(["agent-orchestration"]);

  const topRef = useRef<HTMLDivElement>(null); // ref for top of component
  const feedbackRefs = useRef<(HTMLDivElement | null)[]>([]);

  const recommendationsFinished = visibleCount >= recommendations.length;

  useEffect(() => {
    if (visibleCount < recommendations.length) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);

        setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
          setShowSkeleton(true);

          // Scroll to latest feedback
          const lastIndex = visibleCount;
          feedbackRefs.current[lastIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // tiny delay for smooth transition
      }, LOADING_DELAY);

      return () => clearTimeout(timer);
    } else {
      // Open suggestion accordion
      setOpenItems((prev) => [...prev, "agent-suggestion"]);

      // Scroll to top instead of suggestion after a short delay
      setTimeout(() => {
        topRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [visibleCount, recommendations.length]);

  return (
    <div ref={topRef}>
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={(val) => setOpenItems(val as string[])}
      >
        {/* Suggestion rendered only after all feedbacks */}
        {recommendationsFinished && (
          <AccordionItem value="agent-suggestion">
            <AccordionTrigger>TwinSight Recommendation</AccordionTrigger>
            <AccordionContent>
              <Card className="bg-green-800 mt-2">
                <CardContent className="text-base px-4">
                  {suggestion}
                </CardContent>
                <CardFooter className="px-4">
                  <ButtonGroup>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="cursor-pointer"
                    >
                      <ThumbsUpIcon fill="#2b7fff" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="cursor-pointer"
                    >
                      <ThumbsDownIcon fill="red" />
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Agent Orchestration always rendered */}
        <AccordionItem value="agent-orchestration">
          <AccordionTrigger>Agent Orchestration</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-4 py-2">
              {recommendations.slice(0, visibleCount).map((rec, idx) => (
                <div
                  key={rec.id}
                  ref={(el) => {
                    feedbackRefs.current[idx] = el ?? null;
                  }}
                >
                  <AgentFeedback recommendation={rec} />
                </div>
              ))}

              {visibleCount < recommendations.length && showSkeleton && (
                <FeedbackLoading
                  text={recommendations[visibleCount].agentType}
                />
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
