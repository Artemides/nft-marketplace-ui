import { NextApiRequest, NextApiResponse } from "next";
import { Middleware, NextFunction } from "./handler";

type HttpVerbs = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const allowedMethods =
  (methods: HttpVerbs[]): Middleware =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    if (!methods.includes(req.method as HttpVerbs)) {
      res.status(405).send({ error: `Method ${req.method} not supported` });
      return;
    }
    next();
  };
