import { Exam } from "@/stacks/exam";
import { Persistence } from "@/stacks/persistence";
import { SSTConfig } from "sst";

export default {
  config(_input) {
    return {
      name: "sst-test-2",
      region: "ap-southeast-2",
    };
  },
  async stacks(app) {
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app.stack(Exam);
    app.stack(Persistence);
  },
} satisfies SSTConfig;
