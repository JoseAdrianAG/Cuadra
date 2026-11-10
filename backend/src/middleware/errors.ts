import type { NextFunction, Request, Response } from "express";

export function notFound(_req: Request, res: Response): void {
    res.status(404).json({error: "NOT_FOUND" });
}

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    const status = getStatus(err);
    if(status >= 500) {
        console.error(err);
        res.status(500).json({ error: "INTERNAL_ERROR" });
        return;
    }
    res.status(status).json({ error: status === 413 ? "PAYLOAD_TOO_LARGE" : "BAD_REQUEST"});
}

function getStatus(err: unknown): number {
    if (typeof err === "object" && err !== null && "status" in err) {
        const status = (err as { status: unknown }).status;
        if (typeof status === "number" && status >= 400 && status <600) return status;
    }
    return 500;
}