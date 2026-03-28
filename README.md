# Events API

## Project Overview

Events API is a backend service for creating, reading, updating, and deleting event records. It provides a clear REST interface with request validation and structured JSON responses, making it suitable for web or mobile clients that need event lifecycle management.

This project solves the need for a simple but secure event-management API with built-in documentation. It is intended for developers integrating event features into applications and for teams that need maintainable API contracts through OpenAPI.

## Installation Instructions

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+

### Setup Steps

1. Clone the repository:

```bash
git clone <your-repo-url>
cd Assignment3
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file from the example:

```bash
cp .env.example .env
```

4. Update `.env` with your Firebase credentials and CORS origins.

5. Start the server:

```bash
npm start
```

The API runs on `http://localhost:3000` unless `PORT` is set.

## API Request Examples

### 1) Health Check

**Request:**

```bash
curl -X GET http://localhost:3000/api/v1/health
```

**Response (200 OK):**

```json
{
  "status": "OK",
  "uptime": 12.45,
  "timestamp": "2026-03-28T12:00:00.000Z",
  "version": "1.0.0"
}
```

### 2) Create Event

**Request:**

```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference 2027",
    "date": "2027-10-15T10:00:00.000Z",
    "capacity": 200,
    "registrationCount": 30,
    "status": "active",
    "category": "conference"
  }'
```

**Response (201 Created):**

```json
{
  "message": "Event created successfully",
  "data": {
    "id": "c1ce8f7d-54d7-4a65-a560-f3f31fe3fd9f",
    "name": "Tech Conference 2027",
    "date": "2027-10-15T10:00:00.000Z",
    "capacity": 200,
    "registrationCount": 30,
    "status": "active",
    "category": "conference",
    "createdAt": "2026-03-28T12:00:00.000Z",
    "updatedAt": "2026-03-28T12:00:00.000Z"
  }
}
```

### 3) Update Event

**Request:**

```bash
curl -X PUT http://localhost:3000/api/v1/events/c1ce8f7d-54d7-4a65-a560-f3f31fe3fd9f \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Tech Conference",
    "capacity": 250
  }'
```

**Response (200 OK):**

```json
{
  "message": "Event updated",
  "data": {
    "id": "c1ce8f7d-54d7-4a65-a560-f3f31fe3fd9f",
    "name": "Updated Tech Conference",
    "capacity": 250
  }
}
```

## Link to Public Documentation

Full API documentation is available at:

`https://yourusername.github.io/your-repo/`

Replace this URL with your actual GitHub Pages URL after deployment.

## Local Documentation Access

When running locally, access Swagger UI at:

`http://localhost:3000/api-docs`

Raw OpenAPI JSON is available at:

`http://localhost:3000/api-docs.json`

## Test and Verify

Run automated tests:

```bash
npm test
```

Check Helmet headers:

```bash
curl -I http://localhost:3000/api/v1/health
```

Check CORS behavior for an allowed origin:

```bash
curl -X OPTIONS http://localhost:3000/api/v1/events \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" -i
```


## Security Notes

See `SECURITY.md` for Helmet.js and CORS configuration details with external-source justifications.
