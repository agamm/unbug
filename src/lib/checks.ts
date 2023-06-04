import { OpenAIApi } from "openai";
import { Context } from "probot";
import { getBugs } from "./ai";
import {
  erroredCheckRun,
  failedCheckRun,
  getPRFiles,
  successfullCheckRun,
} from "./github";

export async function runPRChecks(
  context: Context<"pull_request">,
  openai: OpenAIApi
) {
  const files = await getPRFiles(context);

  const results = [];
  let hasBugs = false;
  for (const file of files) {
    console.log(`Got file: ${file.filename}, with  ${file.changes} changes`);
    console.log("Diff:", file.diff);
    let bugs;
    try {
      bugs = await getBugs(openai, file.diff);
    } catch (e) {
      console.error("Error with GPT request", e);
      erroredCheckRun(context, "GPT request error.");
      return;
    }
    bugs = bugs.map((b: any) => ({ ...b, path: file.filename }));
    results.push(...bugs);

    if (bugs.length > 0) hasBugs = true;
  }

  if (hasBugs) {
    failedCheckRun(context, results);
  } else {
    successfullCheckRun(context);
  }
}
