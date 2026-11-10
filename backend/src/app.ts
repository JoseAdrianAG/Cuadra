import express from "express";
import type { Express } from "express";
import helmet from "helmet";
import { healthRouter } from "./routes/health.js";
import { notFound, errorHandler} from "./middleware/errors.js";

export function createApp(): Express {
    const app= express();

    app.disable("x-powered-by");
    app.use(helmet());
    app.use(express.json({ limit: "100kb" }));

    app.use("/api/health", healthRouter);

    app.use(notFound);
    app.use(errorHandler);

    return app;
}