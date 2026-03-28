import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: process.env.API_DOCS_TITLE ?? "Events API",
      version: process.env.API_DOCS_VERSION ?? "1.0.0",
      description: "API documentation for event management endpoints."
    },
    servers: [
      {
        url: process.env.API_BASE_URL ?? "http://localhost:3000",
        description: "Local server"
      }
    ],
    tags: [
      { name: "Health", description: "Health and availability endpoints" },
      { name: "Events", description: "Event CRUD endpoints" }
    ],
    components: {
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
    }
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"]
};

export const openApiSpec = swaggerJSDoc(swaggerOptions);
