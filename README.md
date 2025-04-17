# Graduation-Project
Graduation Project University of Palestine

## API Documentation

### Base URL
```http
http://localhost:5000/api
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```http
Authorization: Bearer <your_jwt_token>
```

### API Endpoints Overview

#### 1. Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user | Public |
| POST | `/auth/logout` | Logout user | Protected |

#### 2. Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get user by ID | Admin/Owner |
| GET | `/users/profile` | Get user profile | Protected |
| PUT | `/users/:id` | Update user | Owner/Admin |
| DELETE | `/users/:id` | Delete user | Admin |

#### 3. Requests
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/requests` | Get all requests | Public |
| GET | `/requests/:id` | Get request by ID | Public |
| POST | `/requests` | Create request | Protected |
| PUT | `/requests/:id` | Update request | Owner/Admin |
| DELETE | `/requests/:id` | Delete request | Admin |
| PUT | `/requests/:id/status` | Update status | Admin |

#### 4. Donations
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/donations` | Get all donations | Public |
| GET | `/donations/:id` | Get donation by ID | Public |
| POST | `/donations` | Create donation | Protected |
| PUT | `/donations/:id` | Update donation | Admin |
| DELETE | `/donations/:id` | Delete donation | Admin |

#### 5. Assistance Types
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/assistance-types` | Get all types | Public |
| GET | `/assistance-types/:id` | Get type by ID | Public |
| POST | `/assistance-types` | Create type | Admin |
| PUT | `/assistance-types/:id` | Update type | Admin |
| DELETE | `/assistance-types/:id` | Delete type | Admin |

#### 6. Donors
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/donors` | Get all donors | Public |
| GET | `/donors/:id` | Get donor by ID | Public |
| POST | `/donors` | Register donor | Protected |
| PUT | `/donors/:id` | Update donor | Admin |
| DELETE | `/donors/:id` | Delete donor | Admin |

#### 7. Chat
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/chats` | Get all chats | Protected |
| GET | `/chats/:id` | Get chat by ID | Protected |
| POST | `/chats` | Send message | Protected |
| GET | `/chats/history/:userId` | Get chat history | Protected |

### Detailed API Documentation

#### Authentication APIs

##### Register User
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "type": "donor | recipient",
  "image": "string (optional)"
}
```

##### Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

#### User APIs

##### Get User Profile
```http
GET /api/users/profile
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "number",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "type": "string",
    "requests": []
  }
}
```

#### Request APIs

##### Create Request
```http
POST /api/requests
```
**Request Body:**
```json
{
  "applicantName": "string",
  "nationalId": "string",
  "familyMembersCount": "number",
  "headOfFamilyStatus": "string",
  "location": "string",
  "description": "string (optional)"
}
```

### Error Handling

All API endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error message"
  }
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### Security Features

1. **Authentication:**
   - JWT-based authentication
   - Token expiration: 24 hours
   - HTTP-only cookies for token storage

2. **Authorization:**
   - Role-based access control (Admin, Donor, Recipient)
   - Resource ownership verification

3. **Data Protection:**
   - Password hashing using bcrypt
   - Input validation and sanitization
   - Rate limiting
   - CORS protection

### Rate Limiting

- Authenticated users: 100 requests per minute
- Unauthenticated users: 30 requests per minute

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/Graduation-Project.git
```

2. Install dependencies
```bash
cd Graduation-Project
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

### Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcrypt for password hashing