import { applyPatch } from "diff";

// Returns the final patched file
export async function getPatchedFile(context: any, file: any) {
  const filePath = file.filename;
  const baseBranch = file.pr.base.ref;

  const finalSource = await getFileContentsBeforePR(
    context,
    filePath,
    baseBranch
  );

  return applyPatch(finalSource, file.patch, {
    fuzzFactor: 0,
  });
}

async function getFileContentsBeforePR(
  context: any,
  filePath: string,
  baseBranch: string
) {
  // Get the owner and repo from the context
  const repo = context.payload.repository ?? context.payload.repo;
  const owner = repo.owner.login;
  const repoName = repo.name;

  // Get the base branch head SHA
  const baseBranchRef = `heads/${baseBranch}`;
  const { data: baseRef } = await context.octokit.git.getRef({
    owner,
    repo: repoName,
    ref: baseBranchRef,
  });
  const baseSHA = baseRef.object.sha;

  // Get the contents of the file at the base branch SHA
  let fileContent = "";
  try {
    const { data: file } = await context.octokit.repos.getContent({
      owner,
      repo: repoName,
      ref: baseSHA,
      path: filePath,
    });
    fileContent = Buffer.from(file.content, "base64").toString();
  } catch (e) {
    return "";
  }

  return fileContent;
}

export async function successfullCheckRun(
  context: any,
  name = "Unbug.io - Bug checks"
) {
  await context.octokit.rest.checks.create(
    context.repo({
      name: name,
      head_sha: context.payload.pull_request.head.sha,
      status: "completed",
      conclusion: "success",
      output: {
        title: "Code seems fine!",
        summary: "It's never bad to double check though!",
      },
    })
  );
}

export async function failedCheckRun(
  context: any,
  results: GPTResult[],
  name = "Unbug.io - Bug checks"
) {
  console.log("TEST TEST", results);
  await context.octokit.rest.checks.create(
    context.repo({
      name: name,
      head_sha: context.payload.pull_request.head.sha,
      status: "completed",
      conclusion: "failure",
      output: {
        title: results[0].reason + "...",
        summary: "The following bugs were found:",
        annotations: results.map((r) => {
          return {
            path: r.path,
            annotation_level: "warning",
            title: "Potential Bug",
            message: r.reason,
            raw_details: `${r.type} type of bug`,
            start_line: r.line,
            end_line: r.line,
          };
        }),
      },
    })
  );
}

export async function getPRFiles(context: any) {
  const pr = context.payload.pull_request;
  if (!pr || pr.state !== "open") return [];

  const org = pr.base.repo.owner.login;
  const repo = pr.base.repo.name;

  let files = await context.octokit.rest.pulls.listFiles({
    pull_number: pr.number,
    owner: org,
    repo: repo,
  });

  // Add PR data to file (used later)
  let filesPacked = files.data ?? [];
  let results = [];
  for (const f of filesPacked) {
    let file = { ...f, pr: pr };
    file["diff"] = await getPatchedFile(context, file);
    results.push(file);
  }

  return results;
}
