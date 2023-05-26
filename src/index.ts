import { Probot } from "probot";

import { Configuration, OpenAIApi } from "openai";

import { runPRChecks } from "./lib/checks";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export = (app: Probot) => {
  app.on(
    ["pull_request.synchronize", "pull_request.opened"],
    async (context: any) => {
      runPRChecks(context, openai);
    }
  );

  // // New users
  // app.on("installation.created", async (context) => {
  //   // Register in DB
  // });
  // app.on("installation.deleted", async (context) => {
  //   // Suspend in DB
  // });
  // // Marketplace events
  // app.on("marketplace_purchase.purchased", async (context) => {
  //   // runPRChecks(context);
  // });
  // app.on("marketplace_purchase.changed", async (context) => {
  //   // runPRChecks(context);
  // });
  // app.on("marketplace_purchase.cancelled", async (context) => {
  //   // runPRChecks(context);
  // });
};
