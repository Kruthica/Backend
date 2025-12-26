# Network Access Setup Guide

## Your Computer's IP Address
**10.225.126.40**

## Quick Checklist

### ✅ Step 1: Verify Backend is Running
```bash
npm run dev
```
You should see:
```
✅ Server is running on http://localhost:8000
🌐 Network access: http://<your-ip>:8000
```

### ✅ Step 2: Verify Frontend is Running
```bash
cd frontend
npm run dev
```
You should see something like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://10.225.126.40:3000/
```

**IMPORTANT:** Look for the "Network:" line - this is the URL to use on other devices!

### ✅ Step 3: Windows Firewall Configuration

**Option A: Allow through Windows Defender Firewall (Recommended)**

1. Open **Windows Defender Firewall**
2. Click **"Allow an app or feature through Windows Defender Firewall"**
3. Click **"Change settings"** (if needed)
4. Find **"Node.js"** in the list
   - If found: Check both **"Private"** and **"Public"**
   - If NOT found: Click **"Allow another app"** → **"Browse"** → Find `node.exe` (usually in `C:\Program Files\nodejs\` or `C:\Users\YourName\AppData\Roaming\npm\`)

**Option B: Temporarily Disable Firewall (For Testing Only)**

1. Open **Windows Defender Firewall**
2. Click **"Turn Windows Defender Firewall on or off"**
3. Turn off for **Private networks** (temporarily)
4. **⚠️ Remember to turn it back on after testing!**

### ✅ Step 4: Test on Same Computer First

1. On your computer, try: `http://10.225.126.40:3000`
2. If this works, proceed to other devices
3. If this doesn't work, check firewall settings

### ✅ Step 5: Access from Other Devices

**Requirements:**
- ✅ Both devices must be on the **same Wi-Fi network**
- ✅ Backend server must be running
- ✅ Frontend server must be running
- ✅ Windows Firewall must allow Node.js

**On your phone/tablet/other device:**
1. Open a web browser
2. Go to: `http://10.225.126.40:3000`
3. The app should load!

## Troubleshooting

### ❌ "This site can't be reached" or "Connection refused"

**Possible causes:**
1. **Firewall blocking** - Check Windows Firewall settings
2. **Server not running** - Make sure both backend and frontend are running
3. **Wrong IP address** - Get your current IP:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" under your active network adapter

### ❌ "Network access" URL not showing in Vite

If Vite doesn't show the Network URL:
1. Make sure `host: '0.0.0.0'` is in `vite.config.js`
2. Restart the frontend server
3. Check if port 3000 is available

### ❌ Can access frontend but API calls fail

**Problem:** Frontend loads but can't connect to backend

**Solution:** The API service automatically detects the host. If accessing via IP, it will use that IP for API calls too.

### ❌ IP Address Changed

Your IP address may change if you:
- Reconnect to Wi-Fi
- Restart your computer
- Connect to a different network

**Solution:** Run `ipconfig` again to get the new IP address.

## Testing Checklist

- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] Windows Firewall allows Node.js
- [ ] Can access `http://10.225.126.40:3000` on same computer
- [ ] Other device is on same Wi-Fi network
- [ ] Can access `http://10.225.126.40:3000` on other device

## Quick Test Commands

**Get your IP:**
```powershell
ipconfig | findstr /i "IPv4"
```

**Test backend health:**
```powershell
curl http://localhost:8000/health
```

**Test network access (from same computer):**
Open browser: `http://10.225.126.40:3000`

## Still Not Working?

1. **Check both servers are running** - Look at terminal windows
2. **Check firewall** - Temporarily disable to test
3. **Check network** - Make sure devices are on same Wi-Fi
4. **Check IP address** - Run `ipconfig` to verify current IP
5. **Check ports** - Make sure nothing else is using ports 3000 or 8000

