# Taski

This repository contains the full-stack source code of **Taski**.

It is structured into two folders:

- `front`: Contains the front-end application.
- `back`: Contains the back-end application.

## Getting Started

To get the back-end and the front-end running locally, first clone this repository.

### Back-end (Laravel)

See [`/back/README.md`](./back/README.md) for setup and usage.

### Front-end (React)

See [`/front/README.md`](./front/README.md) for setup and usage.

## Getting Started with Docker

To spin up the full application stack using Docker Compose (frontend, backend, and database):
Note: This is only for development purposes only

### Prerequisites

- Docker
- Docker compose

### Setup Instructions

1. Copy the environment files

```bash
cp back/.env.example back/.env
cp cp front/.env.example front/.env
```

2. Fill the necessary environment variables

- Backend:

```bash
ADMIN_PASSWORD=admin_password   # used to seed the admin user
USER_PASSWORD=user_password     # used to seed the regular user

# Those environment variables used to configure MySql database container
MYSQL_DATABASE=database_name
MYSQL_ROOT_PASSWORD=database_root_user_password

# the host of the mysql database (should point to db if you're using MySql container)
DB_HOST=db
DB_PORT=3306
DB_DATABASE=taski                # the name of the database (same as MYSQL_DATABASE if you're using the MySql container)
DB_USERNAME=root                 # the name of the database (should be root if you're using the MySql container)
DB_PASSWORD=                     # the password of the database (same as MYSQL_ROOT_PASSWORD if you're using the MySql container)
```

- Frontend

```bash
VITE_API_URL=api_url/api   # the base URL of the api (should be http://back:8000/api if you're using the back container)
```

3. Run the stack

```bash
# Spin up the containers in detached mode and build them
docker compose up -d --build
```

4. Run the database migrations and seeders

```bash
docker compose exec -it back php artisan migrate --seed
```

5. The application should now be available at:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000/api](http://localhost:8000/api)
- MySQL: running on port `3306`
- Adminer: [http://localhost:8080](http://localhost:8080)   # a database management tool to manage the database

6. To run the backend Test Suite run:

 ```bash
docker compose exec -it back php artisan test
```
