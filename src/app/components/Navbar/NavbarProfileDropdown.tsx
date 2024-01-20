"use client";

import Image from "next/image";
import { SignOutButton } from "../Authentication/SignOut";
import { api } from "@/app/utils/trpc/react";

export default function NavbarProfileDropdown() {
  const { data: userData } = api.user.userDetails.useQuery(undefined);
  const imageSrc = userData?.picture;

  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <label className="btn btn-circle btn-sm my-auto overflow-hidden align-middle">
        {imageSrc && (
          <Image
            unoptimized
            loader={({ src }) => src}
            src={imageSrc}
            alt="user profile pic"
            className="w-20"
            width={20}
            height={20}
          />
        )}
      </label>
      <ul className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
        <li>
          <div>{userData?.name}</div>
        </li>
        <SignOutButton />
      </ul>
    </div>
  );
}
