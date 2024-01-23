import { Request, Response } from 'express';

export class ErrorException extends Error {
    statusCode: number;

    message: string;

    data: unknown;

    constructor(statusCode: number, message: string, data?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default function errorHandler(err: ErrorException, req: Request, res: Response): void {
    const { protocol } = req;
    const host = req.get('host');
    const pathname = req.originalUrl;
    const fullUrl = `${protocol}://${host}${pathname}`;
    res.status(err.statusCode || 500).json({
        url: fullUrl,
        status: res.statusCode,
        message: err.message,
        data: err.data,
    });
}

export const BadRequest = (message = '400 Bad Request', data?: unknown) => new ErrorException(400, message, data);

export const NotFound = (message = '404 Not Found', data?: unknown) => new ErrorException(404, message, data);

export const InternalServerError = (message = '500 Internal Server Error', data?: unknown) =>
    new ErrorException(500, message, data);
