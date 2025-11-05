import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from '@supabase/supabase-js';

const embeddings = new OpenAIEmbeddings({
 model: "text-embedding-3-small",
});
export const handleSemanticSearch = async (userQuery: { content: string }) => {
 console.log("userQuery", userQuery);
 const supabaseClient = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
 );
 const vectorStore = new SupabaseVectorStore(embeddings, {
   client: supabaseClient,
   tableName: "documents",
   queryName: "match_documents",
 });
 const similaritySearchResults = await vectorStore.similaritySearch(
   userQuery.content,
   2
 );
 for (const doc of similaritySearchResults) {
   console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
 }
 if (!similaritySearchResults.length) {
   return "No relevant documents found in the knowledge base.";
 }
 // Combine results into a single string to return
 const formattedResults = similaritySearchResults
   .map((doc, idx) => `Result ${idx + 1}: ${doc.pageContent}`)
   .join("\n\n");
 console.log("formattedResults", formattedResults);
 return formattedResults;
};