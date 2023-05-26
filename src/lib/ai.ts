export async function getBugs(openai: any, sourceCode: string, lang: string) {
  // const GPT_PROMPT_TEMPLATE =
  //   '\n\nCheck if there are bugs or logic errors in the code otherwise return []. Give a short reason for the bug. Return the following JSON format: [{"line": 1, "reason":"..."}, \n\n';

  const GPT_PROMPT_TEMPLATE = `Act as a senior software developer.\nI will provide some ${lang} code, and it will be your job to identify serious bugs with said code, don\'t fix them. This could involve detecting logic errors, performance bugs, security bugs, race conditions and calculation bugs, not stylistic issues. Add a reason for those bugs. If you aren\'t sure about the bug, return an empty list. Return only a JSON result of bugs in the following format: [{"line":1,"reason":"short reason", "type":"type"},...\n\`\`\`${lang}\n${sourceCode}\`\`\`\n\n`;
  const prompt = GPT_PROMPT_TEMPLATE;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 128,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const res = response.data.choices[0].text;
  let resultParsed = [];
  try {
    resultParsed = JSON.parse(res);
  } catch (e) {}
  console.log("DEBUG", resultParsed);
  return resultParsed;
}
