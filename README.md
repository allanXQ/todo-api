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
   https://github.com/allanXQ/todo-api.git
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
   TEST_DATABASE_URL=postgres://user:password@localhost:5432/todotest
   APP_URL = http://localhost:5000
   EMAIL = your email address to be used for sending password reset email
   EMAIL_PASSWORD = your email account password
   NODE_ENV = development
   ```

4. **Run Database Migrations:**

   If using Sequelize migrations:

   ```bash
   npx sequelize db:migrate
   ```

## Folder Structure

```plaintext
todo-api/
├── src/
│   ├── config/                # Contains database configuration settings and response messages
│   ├── controllers/           # Business logic for handling requests
│   ├── middleware/            # Middleware functions for authentication, error handling etc.
│   ├── models/                # Sequelize models for database interactions
│   ├── routes/                # Router definitions for API endpoints
│   ├── utils/                 # Utility functions and helpers
│   ├── yupschemas/            # Schemas used for validation with yup
│   └── server.js              # Main Express app setup
├── logs/                      # Log files are stored here
├── tests/                     # Contains test files for the application
├── node_modules/              # Node.js libraries and dependencies
├── .env                       # Environment variables for local development
├── .gitignore                 # Specifies intentionally untracked files to ignore
├── package.json               # Project manifest with metadata and dependencies
├── package-lock.json          # Automatically generated for any operations
├── nodemon.json               # Nodemon configs
├── README.md                  # The top-level README for developers using this project
├── doc.md                     # The API documentation
```

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

## Testing

- **Unit Tests**: Run all unit tests using Jest
  - Create a database for testing purposes
  - Create User and todo tables
  - Update NODE_ENV value to test
  ```bash
  npm run test
  ```
