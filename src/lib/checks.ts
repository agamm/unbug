import { Context } from "probot";
import { getPRFiles, successfullCheckRun } from "./github";

export async function runPRChecks(context: Context<"pull_request">) {
  const files = await getPRFiles(context);

  for (const file of files) {
    console.log(`Got file: ${file.filename}, with  ${file.changes} changes`);
  }

  successfullCheckRun(context);
}
