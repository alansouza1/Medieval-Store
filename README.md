# Medieval Store - Full Stack TypeScript Application

A comprehensive full-stack application for a medieval-themed store. This project features a robust **Node.js** API using the **MSC (Model-Service-Controller)** architecture and a modern **Angular 18+** frontend with **Signals** for reactive state management. The entire ecosystem is containerized with **Docker** for seamless development and deployment.

## 🏰 Project Overview

The Medieval Store allows heroes to register, browse a curated armory of legendary items, and forge royal orders. 

### Key Features
- **Authentication:** Secure registration and login flow using **JWT (JSON Web Tokens)**.
- **Armory Management:** Dynamic product listing with item selection logic.
- **Royal Orders:** Multi-item order creation with automatic database cleanup for empty orders.
- **Reactive UI:** Frontend built with **Angular Signals** for high-performance UI updates.
- **Robust Backend:** TypeScript-based API with strict typing and MySQL integration.
- **Developer Experience:** Fully containerized with healthchecks and root-level orchestration scripts.

## 📸 Visual Journey

### The Entrance (Login)
![Login Screen](docs/images/Screenshot%202026-03-31%20150600.png)

### Hero Registration
![Register Screen](docs/images/Screenshot%202026-03-31%20152257.png)

### The Royal Armory (Product Listing)
![Armory Screen](docs/images/Screenshot%202026-03-31%20152317.png)

### Royal Orders Ledger
![Orders Screen](docs/images/Screenshot%202026-03-31%20152325.png)

## 🛠️ Tech Stack

### Backend
- **TypeScript** & **Node.js**
- **Express.js** (Web Framework)
- **MySQL 8.0** (Database)
- **JWT** (Authentication)
- **Joi** (Schema Validation)
- **CORS** (Cross-Origin Resource Sharing)

### Frontend
- **Angular 18+** (Standalone Components)
- **Angular Signals** (Reactive State)
- **RxJS** (Asynchronous Operations)
- **Google Fonts** (MedievalSharp)
- **Vanilla CSS** (Themed styling)

## 📁 Project Structure

```text
.
├── backend/                # API Source code and configuration
│   ├── src/
│   │   ├── controllers/    # Request handling & Response parsing
│   │   ├── services/       # Business logic & Database orchestration
│   │   ├── models/         # Raw SQL queries & Data access
│   │   ├── interfaces/     # Strict TypeScript type definitions
│   │   └── routes/         # Express endpoint definitions
│   └── utils/              # Database restoration & Seeding tools
├── frontend/               # Angular Frontend application
│   └── src/app/
│       ├── components/     # UI Components (Login, Register, Armory, Orders)
│       └── services/       # Frontend service layer for API calls
├── docs/                   # Documentation and screenshots
├── docker-compose.yml      # Multi-container orchestration
├── .env                    # Centralized environment variables
└── package.json            # Root-level developer scripts
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd typescript-api-mysql
   ```

2. **Initialize Environment:**
   Ensure the `.env` file exists in the root with correct credentials.

3. **Install dependencies:**
   ```bash
   npm install --prefix backend
   npm install --prefix frontend
   ```

4. **Start the Kingdom (Docker):**
   ```bash
   npm run docker:up
   ```

5. **Seed the Database:**
   ```bash
   npm run backend:restore
   ```

6. **Access the Gateways:**
   - **Frontend UI:** `http://localhost:4200`
   - **Backend API:** `http://localhost:3000`

## 🧪 Orchestration Scripts

Run these from the root directory:

| Script | Description |
| :--- | :--- |
| `npm run backend:dev` | Hot-reloading API inside Docker. |
| `npm run backend:test` | Run backend test suites. |
| `npm run backend:restore` | Reset database to initial armory state. |
| `npm run frontend:dev` | Start Angular development server. |
| `npm run docker:up` | Build and start all services. |
| `npm run docker:down` | Stop all services and clean up networks. |

## 🔐 Security & Architecture

The project implements a strict **MSC Architecture** on the backend to separate concerns. Authentication is handled via a JWT middleware flow (planned), and the database uses foreign key constraints to maintain integrity between Users, Orders, and Products.
