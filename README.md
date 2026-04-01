# ⚔️ Medieval Store - Full Stack Ecosystem

Welcome to the **Medieval Store**, a robust full-stack application designed for managing legendary armory and royal orders. This project demonstrates high-level software engineering principles including **MSC (Model-Service-Controller) Architecture**, **Reactive State Management**, and **Production-Grade Security**.

## 🏰 Project Overview

The Medieval Store is a complete marketplace where heroes can register, authenticate, and acquire gear for their quests. The system manages the entire lifecycle of a purchase—from browsing the armory to "Forging" a Royal Order and finally "Completing the Quest" through a secure checkout process.

### ✨ Key Features

#### 🛡️ Security & Authentication
- **Hashed Secrets:** No plain-text passwords! We use **Bcrypt.js** with high salt rounds to ensure hero credentials are unbreakable.
- **JWT Protection:** Secure **JSON Web Tokens** act as the "Seal of the Kingdom," protecting all sensitive routes.
- **Middleware Guarding:** A robust backend middleware validates every request to protected endpoints.
- **Route Guards:** Angular **CanActivate** guards prevent unauthorized visitors from entering the armory or the ledger.

#### ⚒️ The Royal Armory (Frontend)
- **Signal-Based Reactivity:** Built with **Angular 18+**, using **Signals** for instantaneous, high-performance UI updates without the overhead of traditional change detection.
- **Medieval Aesthetic:** A fully themed UI featuring parchment backgrounds, golden borders, and the `MedievalSharp` Google Font.
- **Interactive Checkout:** Multi-select items to "Forge" orders, with a dynamic "CLAIMED" status for sold gear.

#### 📜 Kingdom Ledger (Backend)
- **Clean MSC Architecture:** Strict separation of concerns ensuring the codebase remains maintainable and scalable.
- **Swagger Documentation:** Full interactive API documentation available at `/api-docs`.
- **Dynamic User Mapping:** Orders are automatically linked to the authenticated user's ID via token extraction.
- **Database Integrity:** Foreign key constraints and automatic cleanup logic for empty orders.

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

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Angular 18+, Signals, RxJS, TypeScript, Vanilla CSS |
| **Backend** | Node.js, Express, TypeScript, Bcrypt.js, JsonWebToken |
| **Database** | MySQL 8.0 (Relational Storage) |
| **Docs** | Swagger UI (OpenAPI 3.0) |
| **DevOps** | Docker, Docker Compose, ESLint (Airbnb) |

## 📁 Project Structure

```text
.
├── backend/                # API Ecosystem
│   ├── src/
│   │   ├── controllers/    # Request/Response orchestration
│   │   ├── services/       # Core business logic (MSC)
│   │   ├── models/         # Database access layer (SQL)
│   │   ├── middlewares/    # JWT & Security logic
│   │   ├── interfaces/     # Strict Type definitions
│   │   └── routes/         # Endpoint definitions
│   ├── swagger.json        # OpenAPI specification
│   └── utils/              # Seeding & Restoration tools
├── frontend/               # User Interface
│   └── src/app/
│       ├── components/     # Signal-based standalone components
│       ├── services/       # API abstraction layer
│       ├── guards/         # Navigation security
│       └── environments/   # Dynamic configuration
├── docs/                   # Visual documentation
├── docker-compose.yml      # Service orchestration
└── package.json            # Global developer scripts
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
   Create a `.env` file in the root directory (refer to `.env.example` if available).

3. **Install dependencies:**
   ```bash
   npm install --prefix backend
   npm install --prefix frontend
   ```

4. **Start the Kingdom:**
   ```bash
   npm run docker:up
   ```

5. **Seed the Database:**
   ```bash
   npm run backend:restore
   ```

### 🔗 Useful Endpoints
- **Frontend UI:** `http://localhost:4200`
- **Backend API:** `http://localhost:3000`
- **Swagger Docs:** `http://localhost:3000/api-docs`

## 🧪 Available Scripts

Run these from the root directory for full orchestration:

| Script | Description |
| :--- | :--- |
| `npm run backend:dev` | Start API with hot-reloading. |
| `npm run backend:restore` | Wipe database and reset to initial armory. |
| `npm run frontend:dev` | Launch Angular development server. |
| `npm run docker:up` | Build and lift all containers. |
| `npm run docker:down` | Gracefully shut down the kingdom. |

---
*Forged with ❤️ by the Medieval Store Architects.*
