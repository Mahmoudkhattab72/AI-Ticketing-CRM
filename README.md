# AI-Powered Ticketing CRM 🚀

A robust, production-ready Ticketing CRM backend built with Node.js, Express, and MongoDB,
featuring automated AI-driven ticket analysis (categorization, priority scoring, sentiment analysis,
and suggested responses) powered by the Gemini AI API.

✨ Features
Authentication & Authorization: JWT-based secure authentication with role-based access control (admin, agent, user).

AI-Powered Analysis: Automatically analyzes incoming tickets to determine category, priority, sentiment, and generate smart response suggestions using Gemini AI.

Advanced Querying: Supports filtering, pagination, search text indexing, and sorting for optimal data retrieval.

Analytics & Stats: Aggregation pipeline providing comprehensive insights into ticket distribution by status, priority, and sentiment.

Global Error Handling: Centralized error middleware handling Mongoose cast errors, validation errors, duplicate keys, and operational exceptions cleanly.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB & Mongoose ODM

AI Integration: Gemini AI API

Security & Utilities: JWT, Bcryptjs, Express-Async-Handler

⚙️ Installation & Setup
Clone the repository:

Bash
git clone [https://github.com/YOUR_USERNAME/ai-ticketing-crm.git](https://github.com/Mahmoudkhattab72/ai-ticketing-crm.git)
cd ai-ticketing-crm
Install dependencies:

Bash
npm install

Configure Environment Variables:
Create a .env file in the root directory and add the following variables:

PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
GEMINI_API_KEY=your_gemini_api_key
Run the Application:

Development mode (with Nodemon):
npm run dev
Production mode:

Bash
npm start
🔌 API Endpoints Overview
Auth Routes (/api/auth)
POST /register - Register a new user

POST /login - Login user & token generation

GET /me - Get current logged-in user profile

Ticket Routes (/api/tickets)
POST / - Create a new ticket (Triggers AI Analysis)

GET / - Get all tickets (Supports search, filters, pagination)

GET /stats - Get ticket statistics & aggregation data (Admin/Agent)

GET /:id - Get a single ticket by ID

PATCH /:id - Update a ticket (Admin/Agent)

DELETE /:id - Delete a ticket (Admin only)

👨‍💻 Author
Mahmoud Khattab
