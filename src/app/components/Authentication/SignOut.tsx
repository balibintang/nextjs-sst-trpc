import Link from "next/link";

export const SignOutButton = () => {
  return (
    <li>
      <Link href="/api/auth/signOut">Sign Out</Link>
    </li>
  );
};
