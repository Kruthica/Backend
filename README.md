# Backend & Frontend Project

A full-stack application with a Node.js/Express backend and React frontend for user registration and todo management.

## Project Structure

```
Backend/
├── backend_new/          # Backend application
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── config/
│       ├── controller/
│       ├── models/
│       └── routes/
└── frontend/             # Frontend application
    └── src/
        ├── components/
        ├── services/
        └── ...
```

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Environment variables (.env file)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=8000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:3000
```

3. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:8000` and be accessible on your network at `http://<your-ip>:8000`

### API Endpoints

- `POST /api/v1/users/register` - Register a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
- `POST /api/v1/users/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`
- `GET /api/v1/todos/:userId` - Get all todos for a user
- `POST /api/v1/todos/:userId` - Create a new todo
- `PUT /api/v1/todos/:userId/:todoId` - Update a todo
- `DELETE /api/v1/todos/:userId/:todoId` - Delete a todo

## Frontend Setup

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` and be accessible on your network at `http://<your-ip>:3000`

## Running the Full Application

1. Start the backend server (from root directory):
```bash
npm run dev
```

2. Start the frontend server (in a new terminal, from frontend directory):
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to:
   - Local: `http://localhost:3000`
   - Network: `http://<your-ip>:3000` (accessible from other devices)

## Accessing from Other Devices

### Find Your IP Address

**Windows:**
```powershell
ipconfig
```
Look for "IPv4 Address" under your active network adapter.

**Mac/Linux:**
```bash
ifconfig
# or
ip addr show
```

### Steps to Access from Other Devices

1. Make sure both backend and frontend servers are running
2. Find your computer's local IP address (e.g., `192.168.1.100`)
3. Make sure your device and other devices are on the same Wi-Fi network
4. On other devices, open browser and go to: `http://<your-ip>:3000`
   - Example: `http://192.168.1.100:3000`

### Troubleshooting

- **Can't access from other devices:**
  - Check Windows Firewall settings (allow Node.js through firewall)
  - Make sure both devices are on the same network
  - Verify the IP address is correct
  - Try disabling firewall temporarily to test

- **CORS errors:**
  - The backend is configured to allow all origins in development
  - Make sure the backend is running and accessible

- **Connection refused:**
  - Verify backend is running on port 8000
  - Check that HOST is set to `0.0.0.0` in backend
  - Ensure frontend Vite config has `host: '0.0.0.0'`

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- CORS

### Frontend
- React
- Vite
- React Router
- Axios
- Modern CSS

## Features

- ✅ User registration and login
- ✅ Todo CRUD operations
- ✅ Filter todos (All, Active, Completed)
- ✅ Search todos
- ✅ Sort todos (Newest, Oldest, Priority, Alphabetical)
- ✅ Bulk delete completed todos
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Network access from other devices
- ✅ Error handling
- ✅ Modern UI/UX

## Building for Production

### Backend
```bash
# No build step needed, just run:
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

For production, update:
- CORS origin to your actual domain
- API_BASE_URL in frontend to your production API URL
- Environment variables
