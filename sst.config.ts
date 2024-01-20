import { Persistence } from "@/stacks/persistence";
import { SSTConfig } from "sst";

export default {
  config(_input) {
    return {
      name: process.env.DEPLOYMENT_NAME || "sst-app",
      region: "ap-southeast-2",
    };
  },
  async stacks(app) {
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app.stack(Persistence);
  },
} satisfies SSTConfig;
