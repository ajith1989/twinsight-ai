import { Button } from "@/components/ui/button";
import { MessageCircleCode } from "lucide-react";

export function FloatingChatIcon() {
  return (
    <div className="fixed bottom-4 right-4">
      <Button>
        <MessageCircleCode /> Ask TwinSight
      </Button>
    </div>
  );
}
