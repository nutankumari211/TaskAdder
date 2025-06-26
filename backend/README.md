# Task Management Backend

Express.js backend for the Task Management application with MongoDB, JWT authentication, and RESTful APIs.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Data Validation**: Input validation using express-validator
- **Security**: Password hashing with bcryptjs, JWT authentication
- **Error Handling**: Comprehensive error handling and logging

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **CORS** for cross-origin requests
- **nodemon** for development

## Installation

1. Install dependencies:

bash
npm install

2. Create a `.env` file in the root directory:

env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development

3. Start the development server:
   npm run dev

## API Endpoints

### Authentication

#### Register User

POST /api/auth/register
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123"
}

**Response:**

json
{
"message": "User registered successfully",
"token": "jwt-token-here",
"user": {
"id": "user-id",
"email": "user@example.com",
"createdAt": "2023-01-01T00:00:00.000Z"
}
}

#### Login User

POST /api/auth/login
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123"
}

**Response:**

json
{
"message": "Login successful",
"token": "jwt-token-here",
"user": {
"id": "user-id",
"email": "user@example.com",
"createdAt": "2023-01-01T00:00:00.000Z"
}
}

### Tasks (Protected Routes)

All task endpoints require the `Authorization` header with the JWT token:

Authorization: Bearer <jwt-token>

#### Get All Tasks

GET /api/tasks
Authorization: Bearer <jwt-token>

**Response:**

[
{
"_id": "task-id",
"taskName": "Complete project",
"description": "Finish the MERN stack project",
"dueDate": "2023-12-31T00:00:00.000Z",
"createdAt": "2023-01-01T00:00:00.000Z",
"user": "user-id"
}
]

#### Create Task

POST /api/tasks
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
"taskName": "New Task",
"description": "Task description",
"dueDate": "2023-12-31T00:00:00.000Z"
}

**Response:**

{
"\_id": "task-id",
"taskName": "New Task",
"description": "Task description",
"dueDate": "2023-12-31T00:00:00.000Z",
"createdAt": "2023-01-01T00:00:00.000Z",
"user": "user-id"
}

#### Update Task

PUT /api/tasks/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
"taskName": "Updated Task",
"description": "Updated description",
"dueDate": "2023-12-31T00:00:00.000Z"
}

#### Delete Task

DELETE /api/tasks/:id
Authorization: Bearer <jwt-token>

**Response:**

{
"message": "Task deleted successfully"
}

#### Get Single Task

GET /api/tasks/:id
Authorization: Bearer <jwt-token>

## Database Models

### User Model

{
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
}

### Task Model

{
taskName: { type: String, required: true },
description: { type: String },
dueDate: { type: Date, required: true },
createdAt: { type: Date, default: Date.now },
user: { type: ObjectId, ref: 'User', required: true }
}

## Middleware

### Authentication Middleware

- Verifies JWT tokens
- Adds user information to request object
- Protects routes from unauthorized access

### Validation Middleware

- Validates user registration data
- Validates user login data
- Validates task creation/update data
- Returns detailed error messages

## Development

### Scripts

- `npm run dev` - Start development server with nodemon

### Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development)
