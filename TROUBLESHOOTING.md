# Troubleshooting Internal Server Error

## Common Causes and Solutions

### 1. MongoDB Connection Issue
**Error:** "MongoDB connection failed" or "MONGODB_URI is not defined"

**Solution:**
- Make sure you have a `.env` file in the root directory
- Add your MongoDB connection string:
  ```
  MONGODB_URI=mongodb://localhost:27017/your-database-name
  ```
  Or for MongoDB Atlas:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
  ```

### 2. Port Already in Use
**Error:** "Port 8000 is already in use"

**Solution:**
- Stop any other process using port 8000
- Or change the port in `.env`:
  ```
  PORT=8001
  ```

### 3. Missing Dependencies
**Error:** Module not found errors

**Solution:**
```bash
npm install
```

### 4. Backend Server Not Running
**Error:** "Cannot connect to server"

**Solution:**
- Make sure backend is running:
  ```bash
  npm run dev
  ```
- Check terminal for error messages

### 5. Check Server Status
Test if server is running:
```bash
curl http://localhost:8000/health
```
Should return: `{"status":"OK","message":"Server is running"}`

### 6. Check Backend Logs
Look at the terminal where you ran `npm run dev` for error messages.

### 7. Database Schema Issues
If you have existing todos with priority field:
- The database might have old data with priority field
- You can either:
  - Clear the database and start fresh
  - Or update existing todos to remove priority field

## Quick Fix Steps

1. **Stop the server** (Ctrl+C)

2. **Check .env file exists** with MONGODB_URI

3. **Restart the server:**
   ```bash
   npm run dev
   ```

4. **Check the console output** for specific error messages

5. **Test the health endpoint:**
   - Open browser: `http://localhost:8000/health`
   - Should show: `{"status":"OK","message":"Server is running"}`

## Still Having Issues?

Check the terminal output when starting the server - it will show the specific error message that will help identify the problem.

