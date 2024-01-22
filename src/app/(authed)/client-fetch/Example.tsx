"use client";

import { api } from "@/app/utils/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ExampleComponent = () => {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  const utils = api.useUtils();

  const { data: userData, isLoading: isLoadingUserData } =
    api.user.userDetails.useQuery(undefined);

  const { mutate: changeUserName, isPending: isChangingName } =
    api.user.changeUserName.useMutation({
      onSuccess() {
        utils.user.userDetails.invalidate();
      },
    });

  const isLoading = isChangingName || isLoadingUserData;

  return (
    <div>
      {!userData ? (
        <span className="loading loading-ring loading-md"></span>
      ) : (
        <>
          <h1 className="my-4 text-xl font-medium">Fetched User Data</h1>

          <div>
            <div>Hi {userData.name}!</div>
            <div>Your email is {userData.email}</div>
          </div>

          <div className="my-3 font-medium"> Modify username mutation</div>

          <div className="flex w-fit flex-row">
            <input
              type="text"
              placeholder="New User Name"
              className="= input input-bordered input-sm mr-2 max-w-[16rem]"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            {isLoading ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              <button
                className="btn btn-accent btn-sm"
                onClick={() => {
                  changeUserName(userName);
                  router.refresh();
                }}
              >
                submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
