# 🚀 Employee Management API

This is a **NestJS-based Employee Management API** that provides CRUD operations on employee data. It leverages **Prisma ORM**, **authentication guards**, **role-based access control**, and various other utilities for structured backend development.

## ✨ Features
- 🏢 Employee CRUD operations
- 🔒 Authentication & Authorization using Guards
- 🏷️ Role-based access control (RBAC)
- ⚠️ Exception Handling & Logging
- ✅ Input validation using Pipes
- 🚀 Caching with NestJS caching library. You can use Redis caching as well as an alternative
- 🛢️ Prisma ORM with PostgreSQL
- 🐳 Docker support

## 📂 Folder Structure
```plaintext
TUTORIAL/
├── dist/
├── node_modules/
├── prisma/
│   ├── migrations/
│   ├── prisma.service.ts
│   ├── schema.prisma
├── src/
│   ├── common/
│   │   ├── decorator/
│   │   │   ├── email.decorator.ts
│   │   │   ├── role.decorator.ts
│   │   ├── filter/
│   │   │   ├── global.exception.ts
│   │   ├── guard/
│   │   │   ├── authentication.guard.ts
│   │   │   ├── authorisation.guard.ts
│   │   │   ├── role.enum.ts
│   │   ├── interceptor/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── serialize.interceptor.ts
│   │   ├── pipe/
│   │   │   ├── integer.pipe.ts
│   ├── employee/
│   │   ├── dto/
│   │   │   ├── create-employee.dto.ts
│   │   │   ├── employee.dto.ts
│   │   │   ├── paginated-employee.dto.ts
│   │   │   ├── update-employee.dto.ts
│   │   ├── entities/
│   │   │   ├── employee.controller.spec.ts
│   │   ├── employee.controller.ts
│   │   ├── employee.module.ts
│   │   ├── employee.service.spec.ts
│   │   ├── employee.service.ts
│   ├── app.module.ts
│   ├── main.ts
├── test/
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── tsconfig.build.json
├── tsconfig.json
├── README.md
```

## 📦 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/rounakkraaj-1744.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in the required values.
   ```sh
   cp .env.example .env
   ```

4. **Start the application:**
   ```sh
   npm run start:dev
   ```

5. **(Optional) Run with Docker:**
   ```sh
   docker-compose up --build
   ```

## 📌 API Endpoints
### 🏢 Employee Endpoints

#### 🔍 Get Employees (Paginated, Sorted, and Searchable)
```http
GET /api/v1/employee?page=1&limit=10&sort[field]=name&sort[order]=desc
```

#### 🔍 Get Employee by ID
```http
GET /api/v1/employee/:id
```

#### ✍️ Create Employee
```http
POST /api/v1/employee
Content-Type: application/json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "role": "ADMIN"
}
```

#### ✏️ Update Employee
```http
PUT /api/v1/employee/:id
Content-Type: application/json
{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

#### ❌ Delete Employee
```http
DELETE /api/v1/employee/:id
```

## 🛠 Running Tests

```sh
npm run test
```

## 🔍 Linting & Formatting
```sh
npm run lint
npm run format
```

## HAPPY CODING!! 🚀

