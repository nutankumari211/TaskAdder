# Task Management Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) task management application with user authentication and CRUD operations for tasks.

## Features

- **User Authentication**: Register and login with email/password
- **JWT Token Authentication**: Secure API endpoints with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **User-specific Tasks**: Each user can only see and manage their own tasks
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Client and server-side validation
- **Real-time Feedback**: Toast notifications for user actions

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **CORS** for cross-origin requests
- **nodemon** for development

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API requests
- **React Hot Toast** for notifications
- **Vite** for build tooling

## Prerequisites

- Node.js
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

### 1. Clone the repository
git clone <repository-url>
cd task-management-app


### 2. Backend Setup
1. cd backend
2. npm install


Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### 3. Frontend Setup
1. cd frontend
2. npm install

### 4. Start the Application


**Backend:**
cd backend
npm run dev

**Frontend:**
cd frontend
npm run dev

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000



## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/:id` - Get a specific task


## Project Structure

```
task-management-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskList.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── README.md
```


### Authentication
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes for task management
- Automatic token storage in localStorage

### Task Management
- Create tasks with name, description, and due date
- View all tasks in a clean, organized list
- Edit existing tasks
- Delete tasks with confirmation
- Due date highlighting (overdue, due soon, on time)



## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 
