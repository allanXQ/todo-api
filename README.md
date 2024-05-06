# Todo API

A comprehensive RESTful API for managing todos. The application includes authentication, rate limiting, and comprehensive input validation. Developed using Node.js, Express, and Sequelize with secure JWT authentication.

## Features

- **Authentication & Authorization**: Register, Login, Logout, Password Reset
- **Todos Management**: Create, Read, Update, Delete (CRUD)
- **Input Validation**: Using Yup schemas
- **Rate Limiting**: Prevents abuse and DoS attacks
- **Error Handling**: Centralized error handling
- **Graceful Shutdown**: Properly handles termination signals
- **Logging**: Detailed logging with Winston
- **Database**: Postgres with Sequelize ORM

## Prerequisites

- **Node.js**: 14.x or higher
- **NPM/Yarn**: Package manager
- **PostgreSQL**: Database

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/todo-api.git
   cd todo-api
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Setup Environment Variables:**

   Create a `.env` file in the project root with the following keys:

   ```bash
   PORT=5000
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   DATABASE_URL=postgres://user:password@localhost:5432/todo
   APP_URL = http://localhost:5000
   EMAIL = your email address //to be used for password reset
   EMAIL_PASSWORD = your email account password
   ```

4. **Run Database Migrations:**

   If using Sequelize migrations:

   ```bash
   npx sequelize db:migrate
   ```

## Folder Structure

├── src
│ ├── config // Configuration files (e.g., database, messages)
│ ├── controllers // API endpoint logic
│ ├── middleware // Middlewares (e.g., error handling, rate limiting)
│ ├── models // Sequelize models
│ ├── routes // API routing logic
│ ├── utils // Utility functions
│ ├── yupschemas // Schemas used for yup validations
│ └── server.js // Main Express app setup
├── tests // Unit and integration tests
└── README.md

## Running the Application

1. **Development Mode:**

   Start the server in development mode:

   ```bash
   npm run dev
   ```

2. **Production Mode:**

   Start the server in production mode:

   ```bash
   npm start
   ```

## API Documentation

### Authentication

- **POST /api/v1/auth/register**: Register a new user

  - Body: `{ "email": "user@example.com", "password": "Password123!" }`

- **POST /api/v1/auth/login**: Login and get access token

  - Body: `{ "email": "user@example.com", "password": "Password123!" }`

- **POST /api/v1/auth/logout**: Logout and invalidate tokens

- **POST /api/v1/auth/forgot-password**: Send password reset email

  - Body: `{ "email": "user@example.com" }`

- **POST /api/v1/auth/reset-password/:token**: Reset password using a token
  - Body: `{ "password": "NewPassword123!" }`

### Todos

- **POST /api/v1/todos**: Add a new todo

  - Body: `{ "title": "Todo Title", "description": "Details of the todo" }`

- **GET /api/v1/todos**: Get all todos with filtering and pagination

  - Query Params: `{ "filter": "title substring", "sort": "createdAt", "order": "ASC", "page": 1, "pageSize": 10 }`

- **POST /api/v1/todos**: Update an existing todo

  - Body: `{ "id": 1, "title": "Updated Title", "description": "Updated description", "completed": true }`

- **POST /api/v1/todos**: Delete a specific todo
  - Body: `{ "id": 1 }`

## Testing

- **Unit Tests**: Run all unit tests using Jest
  ```bash
  npm test
  ```
