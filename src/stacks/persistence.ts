import {
  Api,
  Bucket,
  Config,
  Script,
  StackContext,
  Table,
} from "sst/constructs";
import { Auth } from "sst/constructs/future";

export function Persistence({ stack }: StackContext) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    throw new Error("GOOGLE_CLIENT_ID is not set");
  }
  const GOOGLE_CLIENT_ID = new Config.Parameter(stack, "GOOGLE_CLIENT_ID", {
    value: googleClientId,
  });

  const onboardingTable = new Table(stack, "table-onboarding", {
    fields: {
      pk: "string",
      sk: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
  });

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "src/services/utils/auth.handler",
      bind: [onboardingTable, GOOGLE_CLIENT_ID],
    },
  });

  // Script to init things in your deployment
  const tableScript = new Script(stack, "script-init", {
    onCreate: {
      handler: "src/services/jobs/init/startupJob.handler",
    },
  });

  const storageBucket = new Bucket(stack, "bucket-general", {});

  const api = new Api(stack, "api", {
    routes: {
      "GET /api/trpc/{proxy+}": {
        function: {
          handler: "src/services/controllers/base/router.handler",
        },
      },
      "POST /api/trpc/{proxy+}": {
        function: {
          handler: "src/services/controllers/base/router.handler",
        },
      },
    },
    defaults: {
      function: {
        bind: [onboardingTable, auth, GOOGLE_CLIENT_ID, storageBucket],
      },
    },
  });

  stack.addOutputs({
    NEXT_PUBLIC_API_URL: api.url,
    NEXT_PUBLIC_AUTH_URL: auth.url,
  });
}
