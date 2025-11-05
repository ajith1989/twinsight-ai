import {
 streamText,
 UIMessage,
 convertToModelMessages,
 stepCountIs,
 tool,
 InferUITools,
 UIDataTypes,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { handleSemanticSearch } from "@/lib/search";
const tools = {
 semanticSearch: tool({
   description: `get information from your knowledge base on the input keyword query`,
   inputSchema: z.object({
     content: z.string().describe("input keyword query"),
   }),
   execute: async ({ content }) => handleSemanticSearch({ content }),
 }),
};
export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;
export async function POST(req: Request) {
 try {
   const { messages }: { messages: UIMessage[] } = await req.json();
   const result = streamText({
     model: openai("gpt-4.1-mini"),
     messages: convertToModelMessages(messages),
     stopWhen: stepCountIs(2),
     tools,
     system: `You are a helpful assistant with access to a knowledge base. When users ask queestion, search the knwoledge base for relevant information.
     Always search before answering if the question might be related to uploaded documents. Base your answers on search results when available.
     Give concise answers that correctly answers what the user is asking for. Do not flood them with all the information from the search result`,
   });
   return result.toUIMessageStreamResponse();
 } catch (err) {
   console.log("Error in chat POST handler", err);
   return new Response("Error in chat POST handler", { status: 500 });
 }
}