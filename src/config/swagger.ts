import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import { RequestHandler } from 'express';
import cfg from './app.config';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     jwt:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: <b>Value example:</b> \<token\><br><br>
 */

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
        openapi: "3.0.0",
        servers: [
            {
                url: `{scheme}://${cfg.SWAGGER_OPTIONS_HOST}/api`,
                variables: {
                    scheme: {
                        enum: [
                            "http",
                            "https",
                        ],
                        default: "http"
                    },
                },
            },
        ],
    };

    const swaggerOptions: swaggerJSDoc.Options = {
        swaggerDefinition,
        apis: [
            "./src/module/*/route/*.route.{ts, js}",
            "./src/config/swagger.{ts, js}",
        ],
    };

    const swaggerDocs: object = swaggerJSDoc(swaggerOptions);

    const url: string = "/api/docs";
    const serve: RequestHandler[] = swaggerUI.serve;
    const setup: RequestHandler = swaggerUI.setup(swaggerDocs);

    return { url, serve, setup };
};

export default initSwagger;
