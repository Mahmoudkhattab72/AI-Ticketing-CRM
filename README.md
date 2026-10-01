# AI-Powered Ticketing CRM 🚀

A production-ready Ticketing CRM backend built with Node.js, Express, and MongoDB. It automatically analyzes incoming tickets (category, priority, sentiment) and suggests responses using the Gemini AI API.

## ✨ Features

- **Authentication & Authorization:** JWT-based auth with role-based access control (admin, agent, user).
- **AI-Powered Analysis:** Automatically determines category, priority, and sentiment, and generates suggested responses with Gemini AI.
- **Advanced Querying:** Filtering, pagination, text search, and sorting.
- **Analytics & Stats:** Aggregation pipeline for ticket distribution by status, priority, and sentiment.
- **Global Error Handling:** Centralized middleware for Mongoose cast errors, validation errors, duplicate keys, and operational exceptions.

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose ODM
- **AI Integration:** Gemini AI API
- **Security & Utilities:** JWT, bcryptjs, express-async-handler

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Mahmoudkhattab72/AI-Ticketing-CRM.git
cd AI-Ticketing-CRM
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
GEMINI_API_KEY=your_gemini_api_key
```

4. Run the application:

```bash
# Development mode (with Nodemon)
npm run dev

# Production mode
npm start
```

## 📌 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint    | Description                       |
|--------|-------------|-----------------------------------|
| POST   | `/register` | Register a new user               |
| POST   | `/login`    | Login and get a token             |
| GET    | `/me`       | Get current logged-in user profile |

### Ticket Routes (`/api/tickets`)

| Method | Endpoint | Description                                      | Access        |
|--------|----------|--------------------------------------------------|---------------|
| POST   | `/`      | Create a ticket (triggers AI analysis)           | Authenticated |
| GET    | `/`      | Get all tickets (search, filters, pagination)    | Authenticated |
| GET    | `/stats` | Get ticket statistics                            | Admin/Agent   |
| GET    | `/:id`   | Get a single ticket                              | Authenticated |
| PATCH  | `/:id`   | Update a ticket                                  | Admin/Agent   |
| DELETE | `/:id`   | Delete a ticket                                  | Admin only    |

## 👨‍💻 Author

**Mahmoud Khattab** - [GitHub](https://github.com/Mahmoudkhattab72)
