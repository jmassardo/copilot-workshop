---
title: "API Endpoint Documentation"
description: "Generate API documentation from a route handler file"
mode: "ask"
---

Generate API documentation for the endpoints in the following file:

#selection

For each endpoint, document:
1. **Method and Path** (e.g., `GET /api/items`)
2. **Description**: What the endpoint does in plain English
3. **Authentication**: Required or not, and what roles have access
4. **Request Parameters**: Query params, path params, and body schema
5. **Response Format**: Example success response with realistic data
6. **Error Responses**: Common error codes and what triggers them

Follow the existing documentation style in #file:docs/api-reference.md.
Use clear, concise language. Include curl examples for each endpoint.
