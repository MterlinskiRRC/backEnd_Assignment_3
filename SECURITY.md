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
  origin: allowedOrigins.length > 0 ? allowedOrigins : false,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 600
})
```

With environment-aware configuration:
- **Development:** `origin: true` (all origins allowed for easy testing)
- **Production:** `origin: allowedOrigins` (trusted origins from `CORS_ALLOWED_ORIGINS` env variable)

### What Was Configured and Why

1. **Environment-based Origin allowlist**
   - Development: All origins allowed for testing flexibility.
   - Production: Only configured trusted origins accepted, preventing unauthorized access.
   - Loaded from `CORS_ALLOWED_ORIGINS` environment variable (comma-separated list).

2. **Explicit methods list**
   - Restricts cross-origin calls to required HTTP methods only (GET, POST, PUT, DELETE, OPTIONS).
   - Prevents unnecessary PATCH requests from untrusted origins.

3. **allowedHeaders list**
   - Limits accepted request headers to `Content-Type` and `Authorization`.
   - Reduces attack surface by rejecting unexpected headers.

4. **credentials: true**
   - Allows credentials (cookies, authorization headers) in cross-origin requests when needed.
   - Properly configures trust between frontend and API.

5. **maxAge: 600**
   - Caches CORS preflight responses for 10 minutes to reduce repeated OPTIONS requests.
   - Balances performance with reasonable policy refresh frequency.

### External Sources

1. MDN - CORS guide: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
2. OWASP - CORS Misconfiguration: https://owasp.org/www-community/attacks/CORS_OriginHeaderScrutiny
3. Express CORS middleware docs: https://expressjs.com/en/resources/middleware/cors.html
4. PortSwigger CORS vulnerabilities overview: https://portswigger.net/web-security/cors
