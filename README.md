# Medieval Store - TypeScript API

A robust backend API for a medieval-themed store, built with **TypeScript**, **Node.js**, and **MySQL**. This project follows the **MSC (Model-Service-Controller)** architectural pattern to ensure a clean, maintainable, and scalable codebase.

## 🏰 Project Overview

The Medieval Store API allows for managing products, users, and orders. It features secure user authentication using **JWT (JSON Web Token)** and is fully containerized with **Docker** for a consistent development environment.

### Key Features
- **Product Management:** Create and list medieval items.
- **User Authentication:** Secure registration and login with JWT-based authorization.
- **Order Processing:** Manage customer orders and associate them with users and products.
- **MSC Architecture:** Strict separation of concerns between data access, business logic, and request handling.
- **Type Safety:** Leverages TypeScript to minimize runtime errors and improve developer experience.

## 🛠️ Tech Stack

- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Database:** [MySQL 8.0](https://www.mysql.com/)
- **Authentication:** [JWT (JSON Web Token)](https://jwt.io/)
- **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Validation:** [Joi](https://joi.dev/)
- **Linting:** [ESLint](https://eslint.org/) (Airbnb config)

## 📁 Project Structure

The project is divided into a root orchestration layer, a dedicated backend, and an Angular frontend:

```text
.
├── backend/                # API Source code and configuration
│   ├── src/
│   │   ├── controllers/    # Handles incoming requests and responses
│   │   ├── services/       # Contains business logic and rules
│   │   ├── models/         # Interacts with the database (MySQL)
│   │   ├── interfaces/     # TypeScript type definitions
│   │   └── routes/         # API endpoint definitions
│   └── utils/              # Helper scripts and database seeding
├── frontend/               # Angular Frontend application
│   └── src/app/
│       ├── components/     # UI Components (ProductList, etc.)
│       └── services/       # Service layer for API interaction
├── docker-compose.yml      # Docker services configuration
└── package.json            # Root orchestration scripts
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd typescript-api-mysql
   ```

2. **Install dependencies:**
   ```bash
   npm install --prefix backend
   npm install --prefix frontend
   ```

3. **Start the environment:**
   Launch the Backend, Frontend, and MySQL containers:
   ```bash
   npm run docker:up
   ```

4. **Initialize the Database:**
   Run the restore script to create the schema and seed initial data:
   ```bash
   npm run backend:restore
   ```

5. **Access the Applications:**
   - **Backend API:** `http://localhost:3000`
   - **Frontend UI:** `http://localhost:4200`

## 🧪 Available Scripts

These scripts are orchestration commands that run the corresponding `npm` scripts **inside the Docker containers**. Make sure the containers are running with `npm run docker:up` first.

| Script | Description |
| :--- | :--- |
| `npm run backend:dev` | Starts the backend in development mode inside Docker. |
| `npm run backend:test` | Executes tests inside Docker. |
| `npm run backend:lint` | Runs ESLint inside Docker. |
| `npm run backend:restore` | Resets and re-seeds the MySQL database inside Docker. |
| `npm run frontend:dev` | Starts the Angular frontend inside Docker. |
| `npm run docker:up` | Spins up the Docker containers in the background (`-d`). |
| `npm run docker:down` | Stops and removes the Docker containers. |

## 🔐 Authentication

Most endpoints require a valid JWT token. To obtain one, register or login via the `/users` or `/login` endpoints. Include the token in the `Authorization` header for protected routes:

```text
Authorization: Bearer <your-token-here>
```
