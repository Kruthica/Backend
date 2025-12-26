# Environment Setup Guide

## ⚠️ CRITICAL: Create .env File

The backend server **requires** a `.env` file to start. Without it, you'll get errors like:
- "MONGODB_URI is not defined"
- "Failed to start server"
- "Cannot connect to MongoDB"

## Quick Setup

### Step 1: Create .env File

**In the root directory** (`C:\Users\ponma\Desktop\Backend_intro\Backend\`), create a file named `.env`

### Step 2: Add MongoDB Connection

**Option A: Local MongoDB (if installed locally)**
```
MONGODB_URI=mongodb://localhost:27017/todo-app
PORT=8000
HOST=0.0.0.0
```

**Option B: MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Replace `<password>` with your password:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app
PORT=8000
HOST=0.0.0.0
```

**Option C: Quick Test (if MongoDB is not set up yet)**
You can use a local MongoDB instance. If you don't have MongoDB installed:
- Install MongoDB Community Edition, OR
- Use MongoDB Atlas (free cloud option)

### Step 3: Save the File

1. Create a new file named `.env` (no extension, just `.env`)
2. Add the content above
3. Save it in the root directory

### Step 4: Start the Server

```bash
npm run dev
```

## File Location

The `.env` file should be in:
```
C:\Users\ponma\Desktop\Backend_intro\Backend\.env
```

## Example .env File

```
MONGODB_URI=mongodb://localhost:27017/todo-app
PORT=8000
HOST=0.0.0.0
```

## Verify It's Working

After creating `.env` and starting the server, you should see:
```
✅ Server is running on http://localhost:8000
🌐 Network access: http://<your-ip>:8000
MongoDB connected: localhost
```

## Troubleshooting

### "MONGODB_URI is not defined"
- ✅ Check `.env` file exists
- ✅ Check it's in the root directory
- ✅ Check MONGODB_URI is spelled correctly
- ✅ Check there are no spaces around the `=` sign

### "Error connecting to MongoDB"
- ✅ Check MongoDB is running (if local)
- ✅ Check connection string is correct
- ✅ Check internet connection (if using Atlas)
- ✅ Check username/password are correct (if using Atlas)

### Still Not Working?

1. Make sure `.env` file is in the **root directory** (same folder as `package.json`)
2. Make sure there are **no quotes** around the values
3. Make sure there are **no spaces** around the `=` sign
4. Restart the server after creating/editing `.env`

