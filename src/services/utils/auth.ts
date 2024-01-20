import {
  AuthHandler,
  GoogleAdapter,
  createSessionBuilder,
} from "sst/node/future/auth";
import { addUser, getUserDetails } from "../repositories/user/userRepository";
import { Config } from "sst/node/config";

// define session types
export const sessions = createSessionBuilder<{
  user: {
    userId: string;
  };
}>();

export const handler = AuthHandler({
  sessions,
  clients: async () => ({
    // This allows local clients to redirect back to localhost
    local: "http://localhost",
  }),
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: Config.GOOGLE_CLIENT_ID,
    }),
  },
  async onAuthorize() {
    // any code you want to run when auth begins
  },
  async onSuccess(input, response) {
    let user;

    if (input.provider === "google") {
      const claims = input.tokenset.claims();
      let user = await getUserDetails(claims.sub);
      if (!user) {
        user = await addUser({
          userId: claims.sub,
          email: claims.email,
          picture: claims.picture,
          name: claims.given_name,
        });
      }

      return response.session({
        type: "user",
        properties: {
          userId: user.userId,
        },
      });
    }

    throw new Error("Unknown provider");
  },

  // This callback needs some work, not spec compliant currently
  async onError() {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "text/plain",
      },
      body: "Auth failed",
    };
  },
});
