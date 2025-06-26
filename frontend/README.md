# Task Management Frontend

React TypeScript frontend for the Task Management application with modern UI, authentication, and task management features.

## Features

- **Modern UI**: Built with React 18, TypeScript, and Tailwind CSS
- **User Authentication**: Login and registration with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Feedback**: Toast notifications for user actions
- **Form Validation**: Client-side validation with helpful error messages
- **Protected Routes**: Automatic redirection for unauthenticated users

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API requests
- **React Hot Toast** for notifications
- **Vite** for build tooling
- **Context API** for state management

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Login.tsx          # Login form component
│   ├── Register.tsx       # Registration form component
│   ├── Dashboard.tsx      # Main dashboard with task management
│   ├── TaskForm.tsx       # Modal form for creating/editing tasks
│   └── TaskList.tsx       # List component for displaying tasks
├── contexts/
│   └── AuthContext.tsx    # Authentication context provider
├── services/
│   └── api.ts            # API service functions
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles with Tailwind CSS
```

## Components

### Login Component
- Email and password input fields
- Form validation
- Password visibility toggle
- Link to registration page
- Automatic redirection after successful login

### Register Component
- Email, password, and confirm password fields
- Password strength validation
- Link to login page
- Automatic redirection after successful registration

### Dashboard Component
- Header with user information and logout button
- "Add New Task" button
- Task list display
- Modal forms for task creation and editing
- Loading states and error handling

### TaskForm Component
- Modal form for creating and editing tasks
- Task name, description, and due date fields
- Form validation
- Cancel and submit buttons
- Responsive design

### TaskList Component
- Displays all user tasks
- Task name, description, due date, and creation date
- Color-coded due dates (overdue, due soon, on time)
- Edit and delete buttons for each task
- Empty state message

## State Management

### Authentication Context
The `AuthContext` provides:
- User authentication state
- Login and logout functions
- JWT token management
- Automatic token storage in localStorage
- Protected route functionality

### API Service
The `api.ts` service provides:
- Centralized API configuration
- Automatic token injection in requests
- Error handling
- Type-safe API calls

## Styling

The application uses Tailwind CSS for styling with:
- Custom color scheme with primary colors
- Responsive design utilities
- Custom component classes
- Modern UI components
- Consistent spacing and typography

### Custom CSS Classes
- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.input-field` - Form input styling
- `.card` - Card component styling

## Routing

The application uses React Router with:
- Protected routes for authenticated users
- Public routes for login/registration
- Automatic redirection based on authentication status
- Clean URL structure

### Routes
- `/` - Redirects to login
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Main dashboard (protected)

## TypeScript

The application is fully typed with:
- Interface definitions for all data structures
- Type-safe API calls
- Component prop types
- Context type definitions

### Key Types
- `User` - User data structure
- `Task` - Task data structure
- `AuthResponse` - Authentication response
- `CreateTaskData` - Task creation data
- `LoginCredentials` - Login form data

## Development

### Environment Variables
Create a `.env` file for environment-specific configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

### API Configuration
The frontend is configured to proxy API requests to the backend during development. Update the `vite.config.ts` file to change the proxy target.

### Build Configuration
The application uses Vite for fast development and optimized builds. The build process includes:
- TypeScript compilation
- CSS optimization
- Asset optimization
- Code splitting

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Set environment variables
4. Deploy

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Set environment variables
4. Deploy

## Browser Support

The application supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting for optimal loading
- Lazy loading of components
- Optimized bundle size
- Fast refresh during development
- Production optimizations

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- ARIA labels and descriptions 