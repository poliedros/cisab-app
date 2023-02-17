import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  isLoggedIn: boolean;
  token: string;
  email: string;
  roles: string[];
  county_id?: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
    console.log(req.session.user);
  } else {
    res.json({
      isLoggedIn: false,
      token: "",
      email: "",
      roles: [],
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
