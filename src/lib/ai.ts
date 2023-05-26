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
      content: `You are a senior code reviewer capable of understanding complex code and spotting potential bugs. Your role involves identifying serious bugs, which could include logic errors, performance bugs, security bugs, race conditions, and calculation bugs. Please ensure that your analysis is thorough and avoids false positives. Here is some ${lang} code. Remember, we're not looking for stylistic issues, but real bugs that could affect the functionality or security of the application. If you aren't certain about a bug, it's better to return an empty list. When you find a bug, please provide a short reason and its type. The result should be only valid JSON format: [{"line":1,"reason":"short reason", "type":"type"},...]\n\`\`\`\n${sourceCode}\`\`\`\n JSON Result:\n`,
    },
  ];

  // Create the chat completion
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    max_tokens: 128,
  });

  const res = completion.data?.choices[0]?.message?.content ?? "[]";
  let resultParsed = [];
  try {
    resultParsed = JSON.parse(res);
    console.log("DEBUG", completion.data.choices[0].message, resultParsed);
  } catch (e) {}
  return resultParsed;
}
