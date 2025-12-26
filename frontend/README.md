# Frontend - User Registration App

A modern React frontend application for user registration, built with Vite.

## Features

- ✨ Modern and responsive UI
- ✅ Form validation
- 🔄 Real-time error handling
- 📱 Mobile-friendly design
- 🎨 Beautiful gradient design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Configuration

The frontend is configured to connect to the backend API at `http://localhost:8000`. Make sure your backend server is running before using the frontend.

If you need to change the API URL, update the `API_BASE_URL` in `src/services/api.js`.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── RegistrationForm.jsx
│   │   └── RegistrationForm.css
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

