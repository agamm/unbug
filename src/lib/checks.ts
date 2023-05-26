import { OpenAIApi } from "openai";
import { Context } from "probot";
import { getBugs } from "./ai";
import { failedCheckRun, getPRFiles } from "./github"; //successfullCheckRun

export async function runPRChecks(
  context: Context<"pull_request">,
  openai: OpenAIApi
) {
  const files = await getPRFiles(context);

  for (const file of files) {
    console.log(`Got file: ${file.filename}, with  ${file.changes} changes`);
    console.log("Diff:", file.diff);
  }

  console.log(await getBugs(openai, "test"));

  failedCheckRun(context, [
    { reason: "Test", line: 3, path: "/tmp", type: "ValueError" },
  ]);
}
