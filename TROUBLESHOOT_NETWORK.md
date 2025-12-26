# Network Access Troubleshooting Guide

## Current IP Address
**Your current IP: `10.144.121.40`**

⚠️ **Note:** Your IP address changed from `10.225.126.40` to `10.144.121.40`. Make sure you're using the correct IP!

## Quick Fixes

### 1. Verify Server is Running
Make sure you see these messages when starting the server:
```
✅ Server is running on http://localhost:8000
🌐 Network access: http://10.144.121.40:8000
```

### 2. Test on Same Computer First
Before trying from another device, test on the same computer:
- Open browser: `http://10.144.121.40:8000/health`
- Should show: `{"status":"OK","message":"Server is running"}`

If this doesn't work, the issue is with your computer's network configuration.

### 3. Check Windows Firewall
Firewall rules are enabled, but verify:
1. Open **Windows Defender Firewall**
2. Click **"Allow an app or feature through Windows Defender Firewall"**
3. Find **"Node.js JavaScript Runtime"**
4. Make sure both **Private** and **Public** are checked

### 4. Verify Network Connection
Both devices must be on the **same Wi-Fi network**:
- ❌ Mobile data won't work
- ❌ Different Wi-Fi networks won't work
- ✅ Same Wi-Fi network required

### 5. Get Current IP Address
If IP changed, get the new one:
```powershell
ipconfig | findstr /i "IPv4"
```

## Step-by-Step Testing

### Test 1: Backend Health Check (Same Computer)
```powershell
curl http://localhost:8000/health
```
Expected: `{"status":"OK","message":"Server is running"}`

### Test 2: Network Access (Same Computer)
```powershell
curl http://10.144.121.40:8000/health
```
Expected: `{"status":"OK","message":"Server is running"}`

If Test 2 fails but Test 1 works, Windows Firewall is blocking.

### Test 3: Network Access (Other Device)
On your phone/tablet (same Wi-Fi):
- Open browser: `http://10.144.121.40:8000/health`
- Should show: `{"status":"OK","message":"Server is running"}`

## Common Issues & Solutions

### ❌ "This site can't be reached"
**Cause:** Server not running or wrong IP address
**Solution:**
1. Check server is running (look at terminal)
2. Verify IP address: `ipconfig | findstr /i "IPv4"`
3. Use the correct IP in URL

### ❌ "Connection refused"
**Cause:** Firewall blocking or server not bound to 0.0.0.0
**Solution:**
1. Check server logs show: `HOST = 0.0.0.0`
2. Temporarily disable firewall to test
3. Re-enable firewall and add Node.js exception

### ❌ Works on localhost but not network IP
**Cause:** Windows Firewall blocking
**Solution:**
1. Open Windows Defender Firewall
2. Allow Node.js through firewall (Private & Public)
3. Or temporarily disable firewall to test

### ❌ Can access backend but frontend doesn't work
**Cause:** Frontend not configured for network access
**Solution:**
1. Check `frontend/vite.config.js` has `host: '0.0.0.0'`
2. Restart frontend server
3. Use frontend network URL: `http://10.144.121.40:3000`

## Enable Windows Firewall Rule (PowerShell)
If firewall rules aren't working, run as Administrator:
```powershell
netsh advfirewall firewall add rule name="Node.js Backend" dir=in action=allow protocol=TCP localport=8000
netsh advfirewall firewall add rule name="Node.js Frontend" dir=in action=allow protocol=TCP localport=3000
```

## Still Not Working?

1. **Check server logs** - Are there any error messages?
2. **Check both servers running** - Backend (8000) and Frontend (3000)
3. **Try disabling firewall temporarily** - If it works, firewall is the issue
4. **Check router settings** - Some routers block device-to-device communication
5. **Try different port** - Change PORT in .env to 8001 and test

## Network URLs

**Backend:**
- Local: `http://localhost:8000`
- Network: `http://10.144.121.40:8000`

**Frontend:**
- Local: `http://localhost:3000`
- Network: `http://10.144.121.40:3000`

**Health Check:**
- `http://10.144.121.40:8000/health`

