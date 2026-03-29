# Events API - Module 5 Backend Assignment
# Helmet, CORS, Swagger and Pages

## Author
- Update with your name

## Student ID
- Update with your student ID

# Information
- A fully typed, test-driven, Firestore-backend REST API built with:
  - Node.js
  - Express
  - TypeScript
  - Joi validation
  - Jest
- This project implements CRUD operations for event management, including validation, service abstraction, repository patterns, and automated testing.
- Includes Helmet, CORS, Swagger, and GitHub Pages.

### Project Overview

- This API provides a complete event-management backend designed for creating, retrieving, updating, and deleting event records. It is built using Node.js, Express, TypeScript, and Firestore, with a strong focus on security, validation, and documentation. The API includes request validation using Joi, secure HTTP headers via Helmet, environment-based CORS configuration, and documented endpoints using OpenAPI/Swagger.
- The goal of this project is to demonstrate industry-standard backend practices, including modular architecture, validation middleware, automated documentation generation, and public deployment of API docs.

### Installation Instructions

## Prerequisites

- Node.js v20+
- npm v10+
- A Firebase project with Firestore enabled
- Firebase service account credentials
- Git

1. Clone the repository:

```bash
git clone <your-repo-url>
cd Assignment3
```

2. Install dependencies:

```bash
npm install
```

3. Environment variables:

- Create a `.env` file in the project root (or copy from `.env.example` if present) and set:

```env
NODE_ENV=development
PORT=3000

FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-github-pages-url

API_DOCS_TITLE=Events API Documentation
API_DOCS_VERSION=1.0.0
SWAGGER_SERVER_URL=http://localhost:3000/api/v1
```

4. Start the server:

```bash
npm start
```

- API is available at:
  - `http://localhost:3000/api/v1`

### API Requests

- Create an Event:

```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference",
    "date": "2026-06-01T10:00:00Z",
    "capacity": 100,
    "registrationCount": 0,
    "status": "active",
    "category": "conference"
  }'
```

```json
{
  "message": "Event created successfully",
  "data": {
    "id": "auto-generated-firestore-id",
    "name": "Tech Conference",
    "date": "2026-06-01T10:00:00Z",
    "capacity": 100,
    "registrationCount": 0,
    "status": "active",
    "category": "conference"
  }
}
```

- Get All Events:

```bash
curl -X GET http://localhost:3000/api/v1/events
```

```json
{
  "message": "Events retrieved",
  "data": []
}
```

- Update an Event:

```bash
curl -X PUT http://localhost:3000/api/v1/events/<event-id> \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Conference",
    "capacity": 150
  }'
```

```json
{
  "message": "Event updated",
  "data": {
    "id": "<event-id>",
    "name": "Updated Conference",
    "capacity": 150
  }
}
```

### Documentation

5. Link to full public documentation:

https://MterlinskiRRC.github.io/backEnd_Assignment_3/

6. Local documentation access:

- Swagger UI:
  - `http://localhost:3000/api-docs`
- OpenAPI JSON:
  - `http://localhost:3000/api-docs.json`

7. Generate static docs for GitHub Pages:

```bash
npm run generate-docs
```

### Test and Verify

Run tests:

```bash
npm test
```

Check Helmet headers:

```bash
curl -I http://localhost:3000/api/v1/health
```

Check CORS behavior:

```bash
curl -X OPTIONS http://localhost:3000/api/v1/events \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" -i
```

## Security Notes

See `SECURITY.md` for Helmet and CORS configuration details.
