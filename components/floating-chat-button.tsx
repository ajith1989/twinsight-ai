import { Button } from "@/components/ui/button";
import { MessageCircleCode } from "lucide-react";
import Link from "next/link";

export function FloatingChatIcon() {
  return (
    <div className="fixed bottom-4 right-4">
      <Link href="/ask-twinsight" className="cursor-pointer">
        <Button>
          <MessageCircleCode /> Ask TwinSight
        </Button>
      </Link>
    </div>
  );
}
