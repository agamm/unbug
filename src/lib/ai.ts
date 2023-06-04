import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export async function getBugs(openai: OpenAIApi, source_code: string) {
  // Construct the chat messages
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: `Find bugs in the user's code.\n- Format results as JSON like so:\n [{"line":1,"reason":"short reason", "type":"type"},...]\n- It is better to return an empty array than a mistake (not really a bug).`,
    },
    {
      role: "user",
      content: `Here is my code:\n\`\`\`${source_code}\`\`\`\n\nJSON Result:\n`,
    },
  ];

  console.log("Prompt for OpenAI:", messages);

  // Create the chat completion
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    max_tokens: 128,
    temperature: 0,
  });

  const res = completion.data?.choices[0]?.message?.content ?? "[]";

  console.log("Open AI Result:", res);
  let resultParsed = [];
  try {
    resultParsed = JSON.parse(res);
  } catch (e) {}
  return resultParsed;
}
