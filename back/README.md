# Taski Back-End

This is a simple task management backend built with Laravel 10. It supports authentication, user roles, and task management.

## Table of contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development Setup](#development-setup)
  - [Testing](#testing)
- [Features](#features)
- [Built with](#built-with)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The things you need before using the project

- PHP version 8 or above
- Composer
- Laravel 10
- MySql Database

### Development Setup

1. Clone the repository and change the directory to the back folder

```bash
git clone git@github.com:marwaneahansal/wibitech-test.git

cd wibitech-test/back
```

2. Setup environment variables

```bash
cp .env.example .env
```

3. Install dependencies

```bash
composer install
```

4. Generate application key

```bash
php artisan key:generate
```

5. Create database and update `.env` file

- Note: The database is seeded with two default users (admin and regular user). Their passwords are securely pulled from your .env file:

```bash
ADMIN_PASSWORD=admin_password # used to seed the admin user
USER_PASSWORD=user_password   # used to seed the regular user

DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

6. Run migrations and seed the database

```bash
php artisan migrate --seed
```

7. Start the server

```bash
php artisan serve
```

Now you can access the application at `http://localhost:8000`, and the database is set up with the following two users:

- Admin user:
  - username: **admin**
  - password: value of `$ADMIN_PASSWORD` in `.env` file

- Regular user:
  - username: **user**
  - password: value of `$USER_PASSWORD` in `.env` file

### Testing

This project includes basic feature tests to ensure authentication and task-related functionalities work as expected. The tests are executed using Laravel's in-memory SQLite database.

To run the tests execute this command:

```bash
php artisan test
```

The test suite includes:

- AuthTest: tests user authentication and authorization logic

- TasksTest: tests CRUD operations and access control for tasks

- UsersTest: tests user management functionalities

## Features

- User authentication and authorization
  - Admin users can create, update, delete, and view all tasks
  - Regular users can view their own tasks and update the status of their tasks

- Task management
  - Create, update, delete, and view all tasks
  - Filter tasks based on title and status (completed or not completed)
  - Pagination for task lists

- User roles
  - Admin and regular user roles with different permissions

- Features Tests
  - Basic feature tests for authentication and task management features

### Authentication Endpoints

| Method | Endpoint             | Description                               |
|--------|----------------------|-------------------------------------------|
| POST   | /api/auth/login      | Authenticate a user                       |
| POST   | /api/auth/register   | Register a new user                       |
| POST   | /api/auth/logout     | Logout the authenticated user             |

### Task Management Endpoints

| Method | Endpoint             | Description                                                                                                                                           |
|--------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /api/tasks           | Get all tasks (admin will view all tasks and regular users will view their own tasks)                                                                 |
| GET    | /api/tasks/{id}      | Get a specific task by ID (admin can view any task, regular users can only view their own tasks)                                                      |
| POST   | /api/tasks           | Create a new task (admin can create tasks, regular users cannot)                                                                                      |
| PUT    | /api/tasks/{id}      | Update an existing task (admin can update any task, regular users can only update the title, description and status on their own tasks)               |
| DELETE | /api/tasks/{id}      | Delete a task (admin can delete any task, regular users can only delete their own tasks)                                                              |

### Users Management Endpoints

| Method | Endpoint             | Description                                         |
|--------|----------------------|-----------------------------------------------------|
| GET    | /api/users           | Get all users (admin only)                          |

## Built with

- Laravel
- Laravel Sanctum for API authentication
- PHPUnit for testing
- MySQL

## Project Structure

  back/
  ├── app/
  │   ├── Console/             # Artisan commands
  │   ├── Exceptions/          # Custom exception handlers
  │   ├── Http/
  │   │   ├── Controllers/     # Route logic (e.g., AuthController, TaskController, UserController)
  │   │   ├── Middleware/      # HTTP middleware stack
  │   │   └── Requests/        # Form request validation
  │   ├── Models/              # Eloquent models (e.g., User, Task)
  │   └── Providers/           # Service providers
  │
  ├── database/
  │   ├── factories/           # Model factories for seeding
  │   ├── migrations/          # Database schema definitions
  │   └── seeders/             # Database seeders (initial data)
  │
  ├── routes/
  │   └── api.php              # API routes definition
  │
  ├── tests/
  │   └── Feature/             # Feature tests (e.g., AuthTest, TasksTest)
  │
  ├── .env.example             # Example environment config
  ├── composer.json            # Project dependencies
  └── README.md

## Future Improvements

This section outlines the potential future improvements and enhancements that could be made to the project.

- **Better Role Management**:
While role-based logic is currently handled inside controllers for simplicity, further enhancements could include implementing a more granular permission system that allows for custom roles and permissions.

- **User profile management**:
Allow users to update their profiles, including changing passwords and updating personal information.

- **Refresh tokens**:
Implementing refresh tokens for better security and user experience.

- **Rate limiting and Throttling**:
Add request throttling to auth routes to prevent brute-force attacks.

- **Documentation**:
Improving documentation and adding API documentation using tools like Swagger or Postman Collection.
