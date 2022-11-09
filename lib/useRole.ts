import { useEffect } from "react";
import Router from "next/router";
import { User } from "pages/api/user";

type UseRoleType = {
  user?: User | undefined;
  role?: string | undefined;
  redirectTo?: string | undefined;
  redirectIfFound?: boolean | undefined;
};

export default function useRole({
  user = undefined,
  role = "",
  redirectTo = "",
  redirectIfFound = false,
}: UseRoleType = {}) {
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.roles.includes(role)) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.roles.includes(role))
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo, role]);

  return { role };
}
