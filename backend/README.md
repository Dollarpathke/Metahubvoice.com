# Metahub Voice Backend API

🎙️ **The Voice of Decentralized Wealth**

Backend API for Metahub Voice - A comprehensive platform for crypto trading education, affiliate marketing, and Web3 training.

## Features

- ✅ User authentication (JWT)
- ✅ Course management
- ✅ Purchase tracking
- ✅ PayPal integration support
- ✅ User profiles and library
- ✅ Admin verification system
- ✅ MongoDB database
- ✅ RESTful API design

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email notifications

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- MongoDB URI
- JWT secret
- Email credentials
- PayPal credentials

3. **Start the server:**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:courseId` - Get single course
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:courseId` - Update course (admin)

### Purchases
- `POST /api/purchases` - Create purchase
- `GET /api/purchases/user/:email` - Get user purchases
- `GET /api/purchases/:orderId` - Get purchase by order ID
- `PUT /api/purchases/:orderId/verify` - Verify payment (admin)

### Users
- `GET /api/users/:email` - Get user by email
- `PUT /api/users/:email` - Update user profile

### Health Check
- `GET /api/health` - API health status
- `GET /` - API information

## Database Models

### User
- email (unique)
- password (hashed)
- firstName, lastName
- role (user/admin)
- purchases (array)
- timestamps

### Course
- courseId (unique)
- title, description
- price, currency
- image, category
- features, duration
- totalPurchases
- timestamps

### Purchase
- user, userEmail
- course, courseId
- amount, currency
- paymentMethod
- orderId (unique)
- status (pending/completed/failed/refunded)
- verifiedAt, verifiedBy
- timestamps

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**Include token in requests:**
```
Authorization: Bearer <your-token>
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "status": "error",
  "message": "Error description"
}
```

## Success Responses

```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { ... }
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Input validation
- MongoDB injection protection

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=strong-random-secret
FRONTEND_URL=https://metahubvoice.com
```

### Recommended Hosting

- **Heroku** - Easy deployment
- **DigitalOcean** - VPS hosting
- **AWS EC2** - Scalable cloud
- **Vercel** - Serverless functions

## Development

### Adding New Routes

1. Create route file in `/routes`
2. Import in `server.js`
3. Add to app with `app.use()`

### Adding New Models

1. Create model file in `/models`
2. Define schema with Mongoose
3. Export model

## Support

For issues or questions:
- Email: info@metahubacademy.com
- Phone: +1 (973)-8197-530

## License

MIT License - Metahub Voice © 2025

---

**Built by Seth Cryptolord & Starico Isige John**

*Creating wealth beyond boundaries through digital education*
