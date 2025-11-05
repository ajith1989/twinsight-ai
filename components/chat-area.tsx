"use client";
import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputMessage,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { MessageSquare } from "lucide-react";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";
export default function ChatArea() {
  const [prompt, setPrompt] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status } = useChat();
  function handlePromptSubmit(message: PromptInputMessage) {
    if (!message?.text) return;
    sendMessage({ text: message.text });
    setPrompt("");
  }
  return (
    <section className="max-w-2xl mx-auto">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare />}
              title="No messages yet"
              description="Start a conversation to see messages here"
            />
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text": // we don't use any reasoning or tool calls in this example
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" || (status === "streaming" && <Loader />)}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <PromptInput
        onSubmit={handlePromptSubmit}
        className="bg-gray-900 rounded-md"
      >
        <PromptInputBody>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
          <PromptInputTextarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            ref={textareaRef}
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
            <PromptInputSpeechButton
              onTranscriptionChange={setPrompt}
              textareaRef={textareaRef}
            />
          </PromptInputTools>
          <PromptInputSubmit className="bg-[#1800ad] text-white hover:bg-indigo-950" />
        </PromptInputFooter>
      </PromptInput>
    </section>
  );
}
