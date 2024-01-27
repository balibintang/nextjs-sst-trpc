import {
  Bucket,
  Config,
  NextjsSite,
  Script,
  StackContext,
  Table,
} from "sst/constructs";
import { Auth } from "sst/constructs/future"


export function Persistence({ stack }: StackContext) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    throw new Error("GOOGLE_CLIENT_ID is not set");
  }
  const GOOGLE_CLIENT_ID = new Config.Parameter(stack, "GOOGLE_CLIENT_ID", {
    value: googleClientId,
  });

  const onboardingTable = new Table(stack, "onboarding", {
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
  const tableScript = new Script(stack, "initScript", {
    onCreate: {
      handler: "src/services/jobs/init/startupJob.handler",
    },
  });

  const storageBucket = new Bucket(stack, "public", {});

  const site = new NextjsSite(stack, "site", {
    bind: [auth, GOOGLE_CLIENT_ID, storageBucket,onboardingTable ],
  });

  stack.addOutputs({
    SiteUrl: site.url,
    AuthCallbackUrl: `${auth.url}`,
  });
}
