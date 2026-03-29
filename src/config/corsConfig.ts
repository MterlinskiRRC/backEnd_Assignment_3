import { CorsOptions } from "cors";

/**
 * Gets CORS configuration based on the environment
 * 
 * For development, all origins are allowed for easy testing.
 * For production, only specified allowed origins are permitted.
 * 
 * @returns {CorsOptions} CORS configuration object
 */
export const getCorsOptions = (): CorsOptions => {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    // Allow all origins in development for easy testing
    return {
      origin: true,
      credentials: true,
    };
  }

  // Strict CORS policy for production
  const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",").map(origin => origin.trim()) || [];

  return {
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600
  };
};
