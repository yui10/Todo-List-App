import { Request, Response } from 'express';

/* GET users listing. */
// eslint-disable-next-line import/prefer-default-export
export const index = (req: Request, res: Response) => {
    res.send('Hello World');
};
