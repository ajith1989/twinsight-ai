import ChatArea from "@/components/chat-area";
import PageHeader from "@/components/page-header";

export default function ChatPage() {
  return (
    <>
      <PageHeader breadcrumb={[{ title: "Ask TwinSight" }]} />
      <ChatArea />
    </>
  );
}
