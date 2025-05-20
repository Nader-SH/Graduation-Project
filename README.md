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
| POST | `/auth/forgot-password` | Request password reset | Public |
| POST | `/auth/reset-password/:token` | Reset password | Public |
| GET | `/auth/verify-email/:token` | Verify email address | Public |

#### 2. Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get user by ID | Admin/Owner |
| GET | `/users/profile` | Get user profile | Protected |
| GET | `/users/me` | Get current user | Protected |
| PUT | `/users/:id` | Update user | Owner/Admin |
| DELETE | `/users/:id` | Delete user | Admin |
| PUT | `/users/:id/status` | Update user status | Admin |
| PUT | `/users/:id/role` | Update user role | Admin |

#### 3. Requests
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/requests` | Get all requests | Public |
| GET | `/requests/:id` | Get request by ID | Public |
| POST | `/requests` | Create request | Public |
| PUT | `/requests/:id` | Update request | Protected |
| DELETE | `/requests/:id` | Delete request | Admin |
| PUT | `/requests/:id/status` | Update status | Admin |
| GET | `/requests/donations` | Get all donations | Public |
| POST | `/requests/donations` | Add donation | Public |
| GET | `/requests/donations/statistics` | Get donation statistics | Public |
| POST | `/requests/:requestId/donations` | Add donation to specific request | Public |
| POST | `/requests/:requestId/expenses` | Add expense to request | Public |
| GET | `/requests/:requestId/financial-summary` | Get request financial summary | Public |

#### 4. Donations
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/donations` | Get all donations | Public |
| GET | `/donations/:id` | Get donation by ID | Public |
| POST | `/donations` | Create donation | Public |
| PUT | `/donations/:id` | Update donation | Public |
| DELETE | `/donations/:id` | Delete donation | Public |
| GET | `/donations/summary` | Get donation summary | Public |

#### 5. Assistance Types
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/assistance-types` | Get all types | Public |
| GET | `/assistance-types/:id` | Get type by ID | Public |
| POST | `/assistance-types` | Create type | Admin |
| PUT | `/assistance-types/:id` | Update type | Admin |
| DELETE | `/assistance-types/:id` | Delete type | Admin |
| GET | `/assistance-types/stats` | Get type statistics | Admin |

#### 6. Donors
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/donors` | Get all donors | Public |
| GET | `/donors/:id` | Get donor by ID | Public |
| POST | `/donors` | Register donor | Protected |
| PUT | `/donors/:id` | Update donor | Admin |
| DELETE | `/donors/:id` | Delete donor | Admin |
| GET | `/donors/stats` | Get donor statistics | Admin |
| GET | `/donors/user/:userId` | Get user's donor profile | Protected |

#### 7. Chat
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/chats` | Get all chats | Protected |
| GET | `/chats/:id` | Get chat by ID | Protected |
| POST | `/chats` | Create new chat | Protected |
| POST | `/chats/:id/messages` | Send message | Protected |
| GET | `/chats/:id/messages` | Get chat messages | Protected |
| GET | `/chats/user/:userId` | Get user's chats | Protected |
| PUT | `/chats/:id/status` | Update chat status | Protected |

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

##### Forgot Password
```http
POST /api/auth/forgot-password
```
**Request Body:**
```json
{
  "email": "string"
}
```

##### Reset Password
```http
POST /api/auth/reset-password/:token
```
**Request Body:**
```json
{
  "password": "string",
  "confirmPassword": "string"
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
  "description": "string (optional)",
  "assistanceTypeId": "number"
}
```

##### Add Donation to Request
```http
POST /api/requests/:requestId/donations
```
**Request Body:**
```json
{
  "amount": "number",
  "donationType": "one-time | monthly | quarterly | yearly",
  "paymentMethod": "credit_card | bank_transfer | cash | other",
  "donorName": "string",
  "donorEmail": "string",
  "donorPhone": "string (optional)",
  "message": "string (optional)",
  "isAnonymous": "boolean"
}
```

##### Add Expense to Request
```http
POST /api/requests/:requestId/expenses
```
**Request Body:**
```json
{
  "amount": "number",
  "description": "string",
  "category": "string",
  "date": "date"
}
```

#### Donation APIs

##### Create Donation
```http
POST /api/donations
```
**Request Body:**
```json
{
  "amount": "number",
  "donationType": "one-time | monthly | quarterly | yearly",
  "paymentMethod": "credit_card | bank_transfer | cash | other",
  "donorName": "string",
  "donorEmail": "string",
  "donorPhone": "string (optional)",
  "message": "string (optional)",
  "isAnonymous": "boolean"
}
```

#### Chat APIs

##### Send Message
```http
POST /api/chats/:id/messages
```
**Request Body:**
```json
{
  "content": "string",
  "type": "text | image | file"
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
   - Password reset functionality
   - Email verification

2. **Authorization:**
   - Role-based access control (Admin, Donor, Recipient)
   - Resource ownership verification
   - Route-level middleware protection

3. **Data Protection:**
   - Password hashing using bcrypt
   - Input validation and sanitization
   - Rate limiting
   - CORS protection
   - SQL injection prevention
   - XSS protection

### Rate Limiting

- Authenticated users: 100 requests per minute
- Unauthenticated users: 30 requests per minute
- Admin endpoints: 200 requests per minute

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/Graduation-Project.git
```

2. Install backend dependencies
```bash
cd Graduation-Project/server
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Set up environment variables
```bash
# Create .env file from example
cp .env.example .env
```

Then update the `.env` file with your configuration:

```env
# Server Configuration
PORT=8000
DATABASE_URL=postgres://username:password@localhost:5432/database_name
DATABASE_URL_PRODUCTION=your_production_database_url
SECRET_KEY=your_secret_key_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

5. Start the backend development server
```bash
npm run dev
```

6. Start the frontend development server
```bash
npm start
```

### Technologies Used

#### Backend
- **Node.js**
- **Express.js** (web framework)
- **Sequelize** (ORM)
- **PostgreSQL** (database)
- **pg** (PostgreSQL client for Node.js)
- **bcrypt** and **bcryptjs** (password hashing)
- **cors** (Cross-Origin Resource Sharing)
- **dotenv** (environment variable management)
- **joi** (input validation)
- **jsonwebtoken** (JWT authentication)
- **cookie-parser** (cookie handling)
- **compression** (response compression)
- **nodemon** (development server auto-reload)
- **http-errors** (error handling)
- **pg-hstore** (PostgreSQL hstore support)

#### Frontend
- **React 19** (core UI library)
- **react-dom 19** (DOM bindings for React)
- **react-router-dom 7** (routing)
- **Ant Design 5** (UI component library)
- **Axios** (HTTP client)
- **react-icons 5** (icon library)
- **react-scripts** (Create React App scripts)
- **web-vitals** (performance measurement)
- **@testing-library/react** (React component testing)
- **@testing-library/jest-dom** (custom Jest matchers for DOM nodes)
- **@testing-library/user-event** (user event simulation for tests)
- **@testing-library/dom** (DOM testing utilities)
- **Create React App** (for bootstrapping the frontend project)

---

For any questions or issues, please open an issue on the repository or contact the maintainers.