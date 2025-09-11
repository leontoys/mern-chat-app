# MERN Chat App

A real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring Socket.io for real-time messaging, JWT authentication, and a responsive UI with TailwindCSS and DaisyUI.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

## Live Demo

Check out the deployed application: [MERN Chat App](https://mern-chat-app-nznn.onrender.com)

## Features

- 🔐 User Authentication with JWT (JSON Web Tokens)
- 💬 Real-time messaging with Socket.io
- 👥 Online user status indicators
- 🎨 Responsive UI with TailwindCSS and DaisyUI
- 🔍 Search functionality for conversations
- 🚀 Global state management with Zustand
- ⚡ Error handling on both client and server
- 🛡️ Protected routes and authorization

## Tech Stack

- **Frontend**: React, TailwindCSS, DaisyUI, Socket.io-client
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render

## Installation

1. Clone the repository:
```bash
git clone https://github.com/leontoys/mern-chat-app.git
cd mern-chat-app
```

2. Install dependencies for both server and client:
```bash
npm run build
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add your MongoDB connection string and JWT secret:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run server
```

The app will be running on `http://localhost:5000` (backend) and the frontend will be served on `http://localhost:3000` (if running React dev server separately).

## Available Scripts

- `npm run server` - Start the backend server with nodemon
- `npm start` - Start the backend server in production mode
- `npm run build` - Install all dependencies and build the frontend

## Project Structure

```
mern-chat-app/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (auth, error handling)
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── server.js        # Express server setup
│   └── .env             # Environment variables
└── frontend/
    ├── public/          # Static files
    └── src/
        ├── components/  # React components
        ├── context/     # React context providers
        ├── hooks/       # Custom React hooks
        ├── store/       # Zustand store
        └── App.js       # Main React component
```

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/messages/:id` - Get messages for a conversation
- `POST /api/messages/send/:id` - Send a message
- `GET /api/users` - Get users for sidebar

## Tutorial

This project was built following the tutorial by Codesistency: [Build and Deploy a Complete Chat App with MERN Stack](https://www.youtube.com/watch?v=HwCqsOis894)

The tutorial covers:
- Project setup and configuration
- Authentication system with JWT
- Real-time messaging with Socket.io
- Frontend UI development with React
- Deployment process

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Acknowledgments

- [Burak Orkmez](https://github.com/burakorkmez) for the original tutorial and codebase
- [Socket.io](https://socket.io) for real-time communication
- [TailwindCSS](https://tailwindcss.com) and [DaisyUI](https://daisyui.com) for styling

---

If you found this project helpful, please give it a ⭐ on GitHub!