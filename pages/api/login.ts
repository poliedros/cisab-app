import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  const { email, password }: { email: string; password: string } = JSON.parse(
    req.body
  );

  try {
    const response = await fetch("https://api.cisab.czar.dev/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    });
    if (response.status === 500)
      throw new Error("Login or password incorrect.");

    const data = await response.json();

    const { token, username } = {
      token: data.access_token,
      username: email,
    };

    const user = { isLoggedIn: true, username, token } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
