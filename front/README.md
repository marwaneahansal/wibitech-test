# Taski Front-End

This is the frontend for Taski, a simple task management app. It interacts with the Laravel backend API to manage user authentication, roles, and task managements.

## Table of contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development Setup](#development-setup)
- [Features](#features)
- [Built with](#built-with)
- [Project Structure](#project-structure)
- [Philosophy & Design Decisions](#philosophy--design-decisions)

## Getting Started

These instructions will help you get the frontend running locally.

### Prerequisites

The things you need before using the project

- Node.js
- npm
- Backend running locally (see [Taski Back-End](../back/README.md))

### Development Setup

1. Go to the front folder

```bash
cd ./front
```

2. Install dependencies

```bash
npm install
```

3. Copy .env.example

```bash
cp .env.example .env
```

4. Set up your environment variables in `.env`

```bash
VITE_BACKEND_URL=http://localhost:8000/api  # Your Backend server url
```

5. Run the development server

```bash
npm run dev
```

## Features

- User authentication (login/logout)

- View and manage tasks
  - Admin can view all tasks, regular users see their own
  - Create, update, and delete tasks (according to role)
  - Filter by title and status
  - Pagination for task lists

- Notifications and error handling via toast

- Responsive design for mobile and desktop

- Different user roles:
  - Admin: Can view, create, update, and delete any task and user.
  - Regular User: Can view their own tasks and update or delete them.

## Built with

- React 19
- Typescript
- Tailwind CSS
- Shadcn UI
- React Query
- React Hook form + zod
- React Router
- Vite

## Project Structure

    front/
    ├── public/
    ├── src/
    │   ├── api/                  # API service functions for interacting with the backend
    │   ├── components/           # Reusable UI components
    │   |    └── ui/              # UI components from shadcn/ui
    │   ├── contexts/             # Global React contexts (e.g., AuthContext)
    │   ├── hooks/                # Custom React hooks
    │   |    ├── queries/         # React Query-based data fetching hooks
    │   |    └── use-auth.ts      # Hook for accessing auth context
    │   ├── layouts/              # Layout components for wrapping pages
    │   ├── lib/                  # Utilities and shared logic (fetcher, types, etc.)
    │   ├── pages/                # Page-level components (Login, Home, etc.)
    │   ├── schemas/              # Zod validation schemas
    │   ├── routes.tsx            # Route configuration for React Router
    │   ├── App.tsx               # Root component
    │   └── main.tsx              # Entry point for the application
    ├── vite.config.ts
    └── README.md
    
## Philosophy & Design Decisions

This section outlines the core philosophy and design decisions made during the development of the project. It aims to provide insight into the reasoning behind the architecture and technology choices.

- **Modular structure**:
The project is structured around separation of concerns—components, logic, and API calls are cleanly separated for maintainability.

- **UI with shadcn/ui**:
I chose shadcn/ui to move faster without sacrificing flexibility or custom design. It provides a set of clean, accessible, and minimal components that work great with Tailwind CSS.

- **React Query**:
Chosen for its great caching and auto-refetching capabilities, perfect for API-heavy apps like this.

- **Zod + React Hook Form**:
For robust client-side validation, leveraging Zod’s schema parsing and transform tools.

- **Simplified Role Logic**:
Currently, user roles (admin vs. regular user) are handled using conditional logic throughout the UI—rendering different components or actions based on the authenticated user’s role. For this project’s scope, this works well. However, in a more feature-rich application, it would make sense to separate role access at the page or route level.
