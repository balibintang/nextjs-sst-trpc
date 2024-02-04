"use client";

import { useEffect, useState } from "react";

export const SignInButton = ({ authUrl }: { authUrl: string }) => {
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const getRedirectLocation = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "local",
      redirect_uri: `${window.location.origin}/api/auth/signIn`,
      response_type: "code",
      provider: "google",
    });
    return authUrl + "/authorize?" + params.toString();
  };

  useEffect(() => {
    setRedirectUrl(getRedirectLocation());
  }, []);

  return (
    <div>
      <a href={redirectUrl} rel="noreferrer">
        <button className="btn btn-sm mr-2 font-normal capitalize">
          Sign in
        </button>
      </a>
    </div>
  );
};
