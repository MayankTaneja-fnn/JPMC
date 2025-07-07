# Team-34 Backend API

## Overview
This is the backend service for Team-34's application, providing authentication and CRUD operations for managing users with different roles (admin, educator, student). The service is built using Express.js and uses Airtable as its database.

## Tech Stack
- Node.js
- Express.js
- Airtable (Database)
- JWT (Authentication)
- Jest & Supertest (Testing)

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Airtable account with Personal Access Token (PAT)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Team-34/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
AIRTABLE_PAT=your_personal_access_token
AIRTABLE_BASE_ID=your_base_id
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Database Setup

1. Create an Airtable base with the following tables:
   - Users
     - Username (Single line text)
     - Password (Single line text)
     - Role (Single select: admin, educator, student)

2. Get your Airtable credentials:
   - Personal Access Token (PAT)
   - Base ID

## Running the Application

### Development
```bash
npm run dev
```
The server will start on http://localhost:5000

### Production
```bash
npm start
```

### Testing
```bash
npm test
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Admin Routes (Protected)
- `POST /api/admin` - Create new user
- `GET /api/admin` - Get all users
- `PATCH /api/admin/:id` - Update user
- `DELETE /api/admin/:id` - Delete user

### Educator Routes (Protected)
- [Endpoints to be documented]

### Student Routes (Protected)
- [Endpoints to be documented]

## Authentication

The API uses JWT (JSON Web Token) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API uses standard HTTP response codes:
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
    "error": "Error message description"
}
```

## Rate Limiting
- 100 requests per IP per 15 minutes for public routes
- 1000 requests per IP per 15 minutes for authenticated routes

## Security Features
- JWT Authentication
- Role-based access control
- Request rate limiting
- CORS enabled
- Password hashing
- Environment variables for sensitive data

## Development Guidelines

### Code Style
- Use ES6+ features
- Follow ESLint configuration
- Use async/await for asynchronous operations
- Implement proper error handling

### Git Workflow
1. Create feature branch from development
2. Make changes and test
3. Submit pull request
4. Code review
5. Merge to development

### Testing
- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Maintain test coverage above 80%

## Troubleshooting

### Common Issues

1. EADDRINUSE error:
```bash
# Kill process on port 5000
npx kill-port 5000
```

2. Authentication failed:
- Check if JWT_SECRET is properly set
- Verify token expiration
- Ensure proper Authorization header format

3. Airtable errors:
- Verify PAT and Base ID
- Check table structure
- Ensure proper permissions

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
[License details to be added]

## Contact
[Contact information to be added] 