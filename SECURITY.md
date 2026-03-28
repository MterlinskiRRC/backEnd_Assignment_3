# Security Configuration Justification

## Helmet.js Configuration

### Configuration Applied

```typescript
helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  frameguard: { action: "deny" },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: false
  },
  referrerPolicy: { policy: "no-referrer" },
  xDnsPrefetchControl: { allow: false }
})
```

### What Was Configured and Why

1. **contentSecurityPolicy: false**
   - This API serves JSON responses and does not render browser HTML pages.
   - Disabling CSP avoids adding irrelevant policy complexity while still keeping other protective headers enabled.

2. **crossOriginEmbedderPolicy: false**
   - COEP is mainly relevant for browser resource embedding scenarios.
   - Disabling it avoids unnecessary browser restrictions for API consumers while preserving more relevant API-focused protections.

3. **frameguard: { action: "deny" }**
   - Sends `X-Frame-Options: DENY` to reduce clickjacking risk for any accidentally exposed browser-rendered route.

4. **hsts with 1 year max-age**
   - Enforces HTTPS in supporting browsers after first secure visit.
   - `includeSubDomains: true` broadens protection across subdomains.

5. **referrerPolicy: no-referrer**
   - Prevents referrer leakage to external domains, reducing metadata exposure.

6. **xDnsPrefetchControl: { allow: false }**
   - Restricts DNS prefetching behavior and reduces unnecessary outbound lookups from browser contexts.

### Sources

1. Helmet.js documentation: https://helmetjs.github.io/
2. OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/
3. MDN - Strict-Transport-Security: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
4. MDN - Referrer-Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy

## CORS Configuration

### Configuration Applied

```typescript
cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  maxAge: 600
})
```

### What Was Configured and Why

1. **Origin allowlist (from env)**
   - Allows only trusted origins rather than any origin (`*`).
   - Supports environment-specific policies (development vs production).

2. **Explicit methods list**
   - Restricts cross-origin calls to required API methods only.

3. **allowedHeaders list**
   - Limits accepted request headers to expected API usage.

4. **credentials: false**
   - Prevents browser credential sharing across origins when not required.

5. **maxAge: 600**
   - Caches preflight responses for 10 minutes to reduce repeated preflight traffic while keeping policy refresh reasonably quick.

6. **Allow requests without Origin header**
   - Supports server-to-server tools (curl/Postman) that may not include `Origin`.

### External Sources

1. MDN - CORS guide: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
2. OWASP - CORS Misconfiguration: https://owasp.org/www-community/attacks/CORS_OriginHeaderScrutiny
3. Express CORS middleware docs: https://expressjs.com/en/resources/middleware/cors.html
4. PortSwigger CORS vulnerabilities overview: https://portswigger.net/web-security/cors
