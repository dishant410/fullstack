# Personal Task Manager API

A RESTful API for managing personal tasks with CRUD operations.

## Features

- Create, read, update, and delete tasks
- Input validation for task fields
- Persistent storage using JSON file
- Proper HTTP status codes and error handling

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on http://localhost:3000

## API Endpoints

### GET /api/tasks
- Get all tasks
- Returns: Array of tasks

### GET /api/tasks/:id
- Get a specific task by ID
- Returns: Single task object
- Status: 404 if task not found

### POST /api/tasks
- Create a new task
- Required fields:
  - title (string)
- Optional fields:
  - description (string)
  - status (enum: 'pending', 'in-progress', 'completed')
- Returns: Created task object
- Status: 201 on success, 400 for validation errors

### PUT /api/tasks/:id
- Update an existing task
- Same fields as POST
- Returns: Updated task object
- Status: 404 if task not found, 400 for validation errors

### DELETE /api/tasks/:id
- Delete a task
- Returns: No content
- Status: 204 on success, 404 if task not found

## Example Task Object

```json
{
  "id": 1234567890,
  "title": "Complete project",
  "description": "Finish the REST API project",
  "status": "in-progress",
  "createdAt": "2024-01-20T12:00:00.000Z"
}
```

## Error Responses

All endpoints may return the following error status codes:
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error

Error response format:
```json
{
  "error": "Error message"
}
``` 