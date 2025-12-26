# Quick Start Guide

## ⚠️ IMPORTANT: Start Both Servers!

The app requires **TWO servers** to be running:
1. **Backend Server** (Node.js/Express) - Port 8000
2. **Frontend Server** (React/Vite) - Port 3000

## Step-by-Step Setup

### 1. Start Backend Server

**Open Terminal 1:**
```bash
# Make sure you're in the root directory
cd C:\Users\ponma\Desktop\Backend_intro\Backend

# Start the backend server
npm run dev
```

**You should see:**
```
✅ Server is running on http://localhost:8000
🌐 Network access: http://<your-ip>:8000
MongoDB connected: ...
```

**✅ Keep this terminal open!**

### 2. Start Frontend Server

**Open Terminal 2 (NEW TERMINAL):**
```bash
# Navigate to frontend directory
cd C:\Users\ponma\Desktop\Backend_intro\Backend\frontend

# Start the frontend server
npm run dev
```

**You should see:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://10.225.126.40:3000/
```

**✅ Keep this terminal open too!**

### 3. Open the App

**In your browser, go to:**
- Local: `http://localhost:3000`
- Network: `http://10.225.126.40:3000` (for other devices)

## Common Issues

### ❌ "Cannot connect to server" Error

**Problem:** Backend server is not running

**Solution:**
1. Check Terminal 1 - is the backend server running?
2. If not, start it: `npm run dev` (from root directory)
3. Wait for: `✅ Server is running on http://localhost:8000`

### ❌ MongoDB Connection Error

**Problem:** MongoDB is not connected

**Solution:**
1. Make sure MongoDB is running
2. Check `.env` file exists with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=8000
   ```

### ❌ Port Already in Use

**Problem:** Port 8000 or 3000 is already in use

**Solution:**
1. Close any other applications using these ports
2. Or change the port in `.env`:
   ```
   PORT=8001
   ```

## Quick Checklist

Before using the app, verify:

- [ ] Backend server is running (Terminal 1 shows "Server is running")
- [ ] Frontend server is running (Terminal 2 shows "Local: http://localhost:3000")
- [ ] MongoDB is connected (Terminal 1 shows "MongoDB connected")
- [ ] No error messages in either terminal
- [ ] Can access `http://localhost:3000` in browser

## Testing Backend

**Test if backend is running:**
1. Open browser: `http://localhost:8000/health`
2. Should show: `{"status":"OK","message":"Server is running"}`

If this doesn't work, the backend is not running!

## Need Help?

1. **Check both terminals** for error messages
2. **Check .env file** exists with MONGODB_URI
3. **Restart both servers** if needed
4. **Check MongoDB** is running and accessible

