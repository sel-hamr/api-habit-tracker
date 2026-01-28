# 🎯 Habit Tracker API

A robust and scalable RESTful API for tracking daily habits, built with Node.js, Express, TypeScript, and PostgreSQL. Features include user authentication, habit management, tagging system, and comprehensive tracking capabilities.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database](#-database)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📝 **Habit Management** - Create, read, update, and delete habits
- ✅ **Habit Tracking** - Mark habits as complete with optional notes
- 🏷️ **Tagging System** - Organize habits with custom tags and colors
- 👤 **User Management** - Full user profile management
- 📊 **Data Aggregation** - Track streaks and completion statistics

### Technical Features

- ⚡ **Rate Limiting** - Protection against abuse with Redis-backed rate limiting
- 🔒 **Security** - Helmet.js for HTTP headers, bcrypt password hashing
- ✅ **Input Validation** - Zod schema validation for all endpoints
- 🚀 **Performance** - Optimized queries with Drizzle ORM
- 📦 **Clustering** - Multi-core support for better performance
- 🐳 **Docker Ready** - Containerized setup with Docker Compose
- 🧪 **Testing** - Comprehensive test suite with Vitest

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js 5
- **Language**: TypeScript 5
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Caching**: Redis
- **Authentication**: JWT (Jose)
- **Validation**: Zod
- **Testing**: Vitest

### DevOps

- **Containerization**: Docker & Docker Compose
- **Process Management**: Node.js Cluster
- **Development**: tsx, nodemon

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
- [Redis](https://redis.io/) (v7 or higher)
- [Docker](https://www.docker.com/) (optional, for containerized setup)
- [pnpm](https://pnpm.io/) or npm

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/api-habit-tracker.git
cd api-habit-tracker
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=habit_tracker
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DATABASE_URL=postgresql://your_db_user:your_db_password@localhost:5432/habit_tracker

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX_REQUESTS=5

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Set Up Database

```bash
# Generate database migrations
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed the database with sample data
npm run db:seed
```

## ⚙️ Configuration

### Environment Variables

| Variable         | Description                  | Default       |
| ---------------- | ---------------------------- | ------------- |
| `PORT`           | Server port                  | `3000`        |
| `NODE_ENV`       | Environment mode             | `development` |
| `DATABASE_URL`   | PostgreSQL connection string | Required      |
| `JWT_SECRET`     | Secret key for JWT           | Required      |
| `JWT_EXPIRES_IN` | JWT expiration time          | `7d`          |
| `REDIS_HOST`     | Redis server host            | `localhost`   |
| `REDIS_PORT`     | Redis server port            | `6379`        |

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:3000` with hot-reloading enabled.

### Production Mode

```bash
# Build the project
npm run build

# Start the production server
npm start
```

### Using Docker

```bash
# Start all services (app + redis)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Available Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot-reload |
| `npm run build`         | Compile TypeScript to JavaScript         |
| `npm start`             | Run production server                    |
| `npm run prod`          | Build and run production server          |
| `npm run db:generate`   | Generate database migrations             |
| `npm run db:push`       | Push schema changes to database          |
| `npm run db:migrate`    | Run database migrations                  |
| `npm run db:studio`     | Open Drizzle Studio (database GUI)       |
| `npm run db:seed`       | Seed database with sample data           |
| `npm test`              | Run tests                                |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Generate test coverage report            |

## 📚 API Documentation

Complete API documentation is available in [API_DOCS.md](API_DOCS.md).

### Quick Reference

#### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Habits

- `GET /api/habits` - Get all user habits
- `GET /api/habits/:id` - Get habit by ID
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/habits/:id/complete` - Mark habit as complete
- `GET /api/habits/tag/:tagId` - Get habits by tag
- `POST /api/habits/:id/tags` - Add tags to habit

#### Tags

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create new tag
- `PUT /api/tags/:tagId` - Update tag
- `DELETE /api/tags/:tagId` - Delete tag

### Example Request

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "johndoe",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Create a habit
curl -X POST http://localhost:3000/api/habits \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Morning Exercise",
    "description": "30 minutes workout",
    "frequency": "daily",
    "targetCount": 1
  }'
```

## 🗄️ Database

### Schema Overview

The application uses PostgreSQL with the following main tables:

- **users** - User accounts and authentication
- **habits** - User habits with frequency and targets
- **habit_completions** - Records of habit completions
- **tags** - Custom tags for organizing habits
- **habit_tags** - Many-to-many relationship between habits and tags

### Database Management

```bash
# Open Drizzle Studio (Visual Database Manager)
npm run db:studio

# Generate new migration
npm run db:generate

# Apply migrations
npm run db:migrate
```

### Migrations

Migrations are stored in the `migrations/` directory and managed by Drizzle Kit.

## 🧪 Testing

The project uses Vitest for testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📁 Project Structure

```
api-habit-tracker/
├── src/
│   ├── config/           # Configuration files
│   │   ├── rateLimit.ts  # Rate limiting config
│   │   └── redis.ts      # Redis configuration
│   ├── controllers/      # Route controllers
│   │   ├── authController.ts
│   │   ├── habitController.ts
│   │   ├── tagController.ts
│   │   └── userController.ts
│   ├── db/               # Database related
│   │   ├── connection.ts # Database connection
│   │   ├── schema.ts     # Drizzle schema definitions
│   │   └── seed.ts       # Database seeding
│   ├── middleware/       # Express middleware
│   │   ├── asyncHandler.ts
│   │   ├── auth.ts       # JWT authentication
│   │   └── validation.ts # Request validation
│   ├── routes/           # API routes
│   │   ├── authRoutes.ts
│   │   ├── habitRoutes.ts
│   │   ├── tagRoutes.ts
│   │   └── userRoutes.ts
│   ├── schemas/          # Zod validation schemas
│   │   ├── authSchemas.ts
│   │   ├── habitSchemas.ts
│   │   └── userSchemas.ts
│   ├── utils/            # Utility functions
│   │   ├── cluster.ts    # Cluster management
│   │   ├── jwt.ts        # JWT helpers
│   │   ├── passwords.ts  # Password hashing
│   │   └── responseFormatter.ts
│   ├── index.ts          # Application entry point
│   └── server.ts         # Express server setup
├── migrations/           # Database migrations
├── tests/                # Test files
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker configuration
├── drizzle.config.ts     # Drizzle ORM configuration
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest configuration
├── package.json
├── API_DOCS.md           # Detailed API documentation
└── README.md             # This file
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Redis-backed rate limiting
- **Helmet.js**: Security headers
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Parameterized queries via Drizzle ORM
- **CORS**: Configurable cross-origin policies

## 🚦 Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute per user
- Backed by Redis for distributed rate limiting

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- Drizzle ORM for the type-safe database toolkit
- The Node.js community

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**Built with ❤️ using Node.js and TypeScript**
