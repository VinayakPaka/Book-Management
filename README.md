# Book Management Dashboard

A full-stack web application for managing a collection of books with authentication and authorization using Auth0.

## 🚀 Features

- **Authentication & Authorization**: Secure sign up/sign in using Auth0
- **Book Management**: Create, read, update, and delete books
- **Responsive Dashboard**: Clean and intuitive user interface built with Chakra UI
- **Protected API**: GraphQL API secured with JWT authentication
- **Real-time Updates**: Instant UI updates after CRUD operations

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 🛠 Tech Stack

### Frontend
- **React** - UI library for building single-page applications
- **TypeScript** - Type-safe JavaScript
- **Chakra UI** - Component library for consistent design
- **Apollo Client** - GraphQL client for data fetching
- **Auth0 React SDK** - Authentication integration
- **Vite** - Fast build tool and dev server

### Backend
- **NestJS** - Progressive Node.js framework
- **GraphQL** - API query language
- **Prisma** - Modern database ORM
- **SQLite** - Lightweight file-based database
- **Passport JWT** - Authentication middleware
- **Auth0** - Identity and access management

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## 📁 Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── graphql/       # GraphQL queries and mutations
│   │   ├── App.tsx        # Main app component
│   │   ├── Dashboard.tsx  # Books dashboard
│   │   └── main.tsx       # App entry point
│   ├── .env               # Environment variables
│   └── package.json
│
├── server/                # Backend NestJS application
│   ├── prisma/           # Database schema and migrations
│   │   ├── schema.prisma # Prisma schema definition
│   │   └── migrations/   # Database migrations
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── book/         # Book module (service, resolver, DTOs)
│   │   ├── app.module.ts # Root module
│   │   └── main.ts       # App entry point
│   └── package.json
│
└── README.md             # This file
```

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/VinayakPaka/Book-Management.git
```

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `server` directory:

```env
# Auth0 Configuration
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_AUDIENCE=your-auth0-api-identifier

# Database
DATABASE_URL="file:./prisma/dev.db"

# Server
PORT=4000
```

2. Initialize the database:

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### Frontend Configuration

1. Create a `.env` file in the `client` directory:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-api-identifier
VITE_GRAPHQL_URI=http://localhost:4000/graphql
```

### Auth0 Setup

1. **Create an Auth0 Account**
   - Go to [auth0.com](https://auth0.com) and sign up for a free account

2. **Create an Application**
   - In Auth0 Dashboard, go to Applications → Create Application
   - Choose "Single Page Web Applications"
   - Select "React" as the technology
   - Note your **Domain** and **Client ID**

3. **Configure Application Settings**
   - **Allowed Callback URLs**: `http://localhost:5173, https://your-frontend-url.com`
   - **Allowed Logout URLs**: `http://localhost:5173, https://your-frontend-url.com`
   - **Allowed Web Origins**: `http://localhost:5173, https://your-frontend-url.com`

4. **Create an API**
   - Go to Applications → APIs → Create API
   - Give it a name (e.g., "Book Management API")
   - Set an identifier (e.g., `https://book-api.com`) - this is your **AUDIENCE**
   - Select **RS256** as the signing algorithm

5. **Update Environment Variables**
   - Use the **Domain** and **Client ID** from step 2
   - Use the **Identifier** from step 4 as the audience

## 🏃 Running Locally

### Start the Backend

```bash
cd server
npm run start:dev
```

The GraphQL API will be available at `http://localhost:4000/graphql`

### Start the Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173`
`

## 📚 API Documentation

### GraphQL Schema

```graphql
type Book {
  id: Int!
  name: String!
  description: String!
}

type Query {
  books: [Book!]!
}

type Mutation {
  createBook(input: CreateBookInput!): Book!
  updateBook(id: Int!, input: UpdateBookInput!): Book!
  deleteBook(id: Int!): Book!
}

input CreateBookInput {
  name: String!
  description: String!
}

input UpdateBookInput {
  name: String
  description: String
}
```

### Example Queries

**Get All Books**
```graphql
query {
  books {
    id
    name
    description
  }
}
```

**Create a Book**
```graphql
mutation {
  createBook(input: {
    name: "The Great Gatsby"
    description: "A classic American novel"
  }) {
    id
    name
    description
  }
}
```

**Update a Book**
```graphql
mutation {
  updateBook(id: 1, input: {
    name: "The Great Gatsby - Updated"
  }) {
    id
    name
    description
  }
}
```

**Delete a Book**
```graphql
mutation {
  deleteBook(id: 1) {
    id
    name
  }
}
```

## 🔒 Authentication

All GraphQL API endpoints are protected and require a valid JWT token from Auth0. The frontend automatically handles token management and includes the token in all API requests.

## 🧪 Testing

### Backend Tests
```bash
cd server
npm run test
npm run test:e2e
```

### Frontend Tests
```bash
cd client
npm run test
```

## 🤝 Contributing

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```bash
git commit -m "feat: add pagination to books table"
git commit -m "fix: resolve authentication issue on refresh"
```

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

Vinayak Paka - [GitHub Profile](https://github.com/vinayakpaka)

## 🙏 Acknowledgments

- [NestJS Documentation](https://nestjs.com/)
- [React Documentation](https://react.dev/)
- [Auth0 Documentation](https://auth0.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Chakra UI Documentation](https://chakra-ui.com/)

## 📞 Support

For questions or issues, please open an issue on GitHub or contact [vinayakpaka22@gmail.com](mailto:vinayakpaka22@gmail.com).

---

**Built with ❤️ for the Full Stack Engineering Test**
