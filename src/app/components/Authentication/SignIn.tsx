import { headers } from "next/headers";

export const SignInButton = ({ authUrl }: { authUrl: string }) => {
  const headersList = headers();
  const referer = headersList.get("referer") || "";
  const originUrl = new URL(referer).origin;


  const getRedirectLocation = () => {
    const params = new URLSearchParams({
      client_id: "local",
      redirect_uri: `${originUrl}/api/auth/signIn`,
      response_type: "code",
      provider: "google",
    });
    return authUrl + "/authorize?" + params.toString();
  };

  return (
    <div>
      <a href={getRedirectLocation()} rel="noreferrer">
        <button className="btn btn-sm mr-2 font-normal capitalize">
          Sign in
        </button>
      </a>
    </div>
  );
};
