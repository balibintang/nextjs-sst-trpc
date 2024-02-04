import { SignInButton } from "@/app/components/Authentication/SignIn";
import { Auth } from "sst/node/future/auth";

export default function Login() {
  return (
    <main>
      <div>
        You have are not currently signed in, please sign in
        <SignInButton authUrl={process.env.NEXT_PUBLIC_AUTH_URL ?? ""} />
      </div>
    </main>
  );
}
