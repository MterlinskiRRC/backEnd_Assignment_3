import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: process.env.API_DOCS_TITLE ?? "Events API Documentation",
      version: process.env.API_DOCS_VERSION ?? "1.0.0",
      description: "This is the API documentation for the Events Management application."
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL ?? "http://localhost:3000/api/v1",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Event: {
          type: "object",
          required: ["id", "name", "date", "capacity", "registrationCount", "status", "category", "createdAt", "updatedAt"],
          properties: {
            id: { type: "string", format: "uuid", example: "c1ce8f7d-54d7-4a65-a560-f3f31fe3fd9f" },
            name: { type: "string", example: "Tech Conference 2027" },
            date: { type: "string", format: "date-time", example: "2027-10-15T10:00:00.000Z" },
            capacity: { type: "integer", example: 200 },
            registrationCount: { type: "integer", example: 50 },
            status: { type: "string", enum: ["active", "cancelled", "completed"], example: "active" },
            category: { type: "string", enum: ["conference", "workshop", "meetup", "seminar", "general"], example: "conference" },
            createdAt: { type: "string", format: "date-time", example: "2026-03-28T12:00:00.000Z" },
            updatedAt: { type: "string", format: "date-time", example: "2026-03-28T12:00:00.000Z" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Internal server error" }
          }
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Validation error" },
            details: {
              type: "array",
              items: { type: "string" },
              example: ["name is required"]
            }
          }
        },
        HealthResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "OK" },
            uptime: { type: "number", example: 1532.24 },
            timestamp: { type: "string", format: "date-time", example: "2026-03-28T12:00:00.000Z" },
            version: { type: "string", example: "1.0.0" }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"]
};

/**
 * Generates the Swagger/OpenAPI specification
 * 
 * @returns {object} The compiled OpenAPI specification
 */
export const generateSwaggerSpec = (): object => {
  return swaggerJsdoc(swaggerOptions);
};
