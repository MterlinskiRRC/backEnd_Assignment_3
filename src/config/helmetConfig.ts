import helmet from "helmet";

/**
 * Gets Helmet security configuration based on the environment
 * 
 * For development, some strict security features are relaxed to enable
 * testing and debugging. For production, maximum security is applied.
 * 
 * @returns {object} Helmet configuration object
 */
export const getHelmetConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Base configuration for API applications
  const baseConfig = {
    contentSecurityPolicy: false, // Disable CSP for JSON APIs
    hidePoweredBy: true, // Always hide server technology information
    noSniff: true, // Always prevent MIME type sniffing
  };

  if (isDevelopment) {
    return helmet({
      ...baseConfig,
      hsts: false, // No HTTPS enforcement in development
    });
  }

  // Production configuration with full security
  return helmet({
    ...baseConfig,
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "no-referrer" },
    xDnsPrefetchControl: { allow: false }
  });
};
