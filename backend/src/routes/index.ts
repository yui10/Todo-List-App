import { Request, Response } from "express";

/* GET users listing. */
export const index = (req: Request, res: Response) => {
  res.send('Hello World');
};
