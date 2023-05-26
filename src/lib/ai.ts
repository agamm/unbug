import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export async function getBugs(
  openai: OpenAIApi,
  sourceCode: string,
  lang = "source"
) {
  // Construct the chat messages
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "user",
      content: `You are a senior developer. Check the code for bugs (logic, security, calculation or race condition bugs). If you aren't sure there is a bug return an empty list. The result should be only valid JSON format: [{"line":1,"reason":"short reason", "type":"type"},...]\n\`\`\`\n${sourceCode}\`\`\`\n JSON Result:\n`,
    },
  ];

  // Create the chat completion
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    max_tokens: 128,
    temperature: 0,
  });

  const res = completion.data?.choices[0]?.message?.content ?? "[]";
  let resultParsed = [];
  try {
    resultParsed = JSON.parse(res);
  } catch (e) {}
  return resultParsed;
}
