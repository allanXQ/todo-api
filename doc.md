# Todo API Documentation

## Overview

The Todo API is a backend service that supports user authentication, authorization, and a comprehensive CRUD system for managing todo items. This documentation provides information on how to interact with each of the available API endpoints.

## Authentication

### Register a New User

**Endpoint:** `POST /api/v1/auth/register`

**Description:** Register a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "ValidPass123!"
}
```

**Responses:**

- **200 OK**: User registered successfully.
- **400 Bad Request**: Invalid or missing fields (e.g., email, password).

**Example Response:**

```json
{
  "message": "User created successfully."
}
```

### User Login

**Endpoint:** `POST /api/v1/auth/login`

**Description:** Log in a user and receive an access token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "ValidPass123!"
}
```

**Responses:**

- **200 OK**: Login successful with an access token.
- **400 Bad Request**: Invalid credentials or missing fields.

**Example Response:**

```json
{
  "message": "Login successful.",
  "token": "JWT_ACCESS_TOKEN"
}
```

### User Logout

**Endpoint:** `POST /api/v1/auth/logout`

**Description:** Log out the user by clearing the token.

**Responses:**

- **200 OK**: Successfully logged out.

**Example Response:**

```json
{
  "message": "Logout successful."
}
```

### Forgot Password

**Endpoint:** `POST /api/v1/auth/forgot-password`

**Description:** Send an email with instructions to reset the password.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Responses:**

- **200 OK**: Email sent successfully.
- **400 Bad Request**: Invalid email or user not found.

**Example Response:**

```json
{
  "message": "Password reset email sent."
}
```

### Reset Password

**Endpoint:** `POST /api/v1/auth/reset-password/:token`

**Description:** Reset the password using the provided token.

**Request Body:**

```json
{
  "password": "NewPassword123!"
}
```

**Responses:**

- **200 OK**: Password reset successfully.
- **401 Unauthorized**: Invalid or expired token.

**Example Response:**

```json
{
  "message": "Password reset successful."
}
```

## Todo CRUD Operations

### Create Todo

**Endpoint:** `POST /api/v1/todos/add`

**Description:** Create a new todo item.

**Request Headers:**

- `Authorization: Bearer JWT_ACCESS_TOKEN`

**Request Body:**

```json
{
  "title": "New Todo Title",
  "description": "Description for the new todo item."
}
```

**Responses:**

- **200 OK**: Todo created successfully.
- **400 Bad Request**: Missing required fields (e.g., title).

**Example Response:**

```json
{
  "message": "Todo created successfully.",
  "data": {
    "id": 1,
    "title": "New Todo Title",
    "description": "Description for the new todo item.",
    "completed": false
  }
}
```

### Get Todos

**Endpoint:** `GET /api/v1/todos`

**Description:** Retrieve a list of todos for the authenticated user.

**Request Headers:**

- `Authorization: Bearer JWT_ACCESS_TOKEN`

**Query Parameters:**

- `filter` (optional): Search term to filter by title.
- `sort` (optional, default: `createdAt`): Field to sort the todos by.
- `order` (optional, default: `ASC`): Order of the sorting (`ASC` or `DESC`).
- `page` (optional, default: `1`): Page number to retrieve.
- `pageSize` (optional, default: `10`): Number of items per page.

**Responses:**

- **200 OK**: Returns a list of todos.
- **401 Unauthorized**: Missing or invalid authorization token.

**Example Response:**

```json
{
  "message": "Todos retrieved successfully.",
  "data": {
    "data": [
      {
        "id": 1,
        "title": "First Todo",
        "description": "Description of the first todo.",
        "completed": false
      }
    ],
    "total": 1,
    "totalPages": 1,
    "currentPage": 1
  }
}
```

### Update Todo

**Endpoint:** `POST /api/v1/todos/update`

**Description:** Update an existing todo.

**Request Headers:**

- `Authorization: Bearer JWT_ACCESS_TOKEN`

**Request Body:**

```json
{
  "id": 1,
  "title": "Updated Todo Title",
  "description": "Updated description."
}
```

**Responses:**

- **200 OK**: Todo updated successfully.
- **404 Not Found**: The specified todo does not exist.

**Example Response:**

```json
{
  "message": "Todo updated successfully.",
  "data": {
    "id": 1,
    "title": "Updated Todo Title",
    "description": "Updated description.",
    "completed": false
  }
}
```

### Delete Todo

**Endpoint:** `POST /api/v1/todos/delete`

**Description:** Delete a todo by its ID.

**Request Headers:**

- `Authorization: Bearer JWT_ACCESS_TOKEN`

**Request Body:**

```json
{
  "id": 1
}
```

**Responses:**

- **200 OK**: Todo deleted successfully.
- **404 Not Found**: The specified todo does not exist.

**Example Response:**

```json
{
  "message": "Todo deleted successfully."
}
```

## Error Codes and Messages

- **400 Bad Request:** Invalid or missing parameters.
- **401 Unauthorized:** Missing or invalid token.
- **404 Not Found:** The requested resource could not be found.

## Security Considerations

- **Authentication:** All endpoints require a valid JWT token.
- **Rate Limiting:** Built-in rate limiting middleware ensures no single user can overload the system.
