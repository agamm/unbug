import { Context } from "probot";
import { failedCheckRun, getPRFiles, successfullCheckRun } from "./github";

export async function runPRChecks(context: Context<"pull_request">) {
  const files = await getPRFiles(context);

  for (const file of files) {
    console.log(file);
    console.log(`Got file: ${file.filename}, with  ${file.changes} changes`);
  }

  failedCheckRun(context, [
    { reason: "Test", line: 3, path: "/tmp", type: "ValueError" },
  ]);
}
