import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import express from "express";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bodyParser: false
    });

    app.setGlobalPrefix("api");

    // Configure CORS for credentials/cookies
    /***
	app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });
**/
    // Re-enable json parsing for all non-auth routes
    app.use((req, res, next) => {
        if (req.originalUrl.startsWith("/api/auth")) {
            return next();
        }
        express.json()(req, res, next);
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
