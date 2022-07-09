import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const initSwagger = (): {
    url: string,
    serve: RequestHandler[],
    setup: RequestHandler,
} => {
    const swaggerDefinition: SwaggerDefinition = {
        info: {
            title: "User profile API",
            version: "1.0.0",
        },
        host: `${process.env.SWAGGER_OPTIONS_HOST}/api`,
    };

    const swaggerOptions: swaggerJSDoc.Options = {
        swaggerDefinition,
        apis: ["./src/module/*/route/*.route.{ts, js}"],
    };

    const swaggerDocs: object = swaggerJSDoc(swaggerOptions);

    const url: string = "/api/docs";
    const serve: RequestHandler[] = swaggerUI.serve;
    const setup: RequestHandler = swaggerUI.setup(swaggerDocs);

    return { url, serve, setup };
};

export default initSwagger;
