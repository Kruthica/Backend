# Network Access Guide - UPDATED

## Your Computer's IP Address
**10.225.126.40**

⚠️ **IMPORTANT:** If you're still having issues, check the new **NETWORK_SETUP.md** file for detailed troubleshooting steps!

## Quick Start

### 1. Start Backend Server
From the root directory:
```bash
npm run dev
```
Backend will be accessible at:
- Local: `http://localhost:8000`
- Network: `http://10.225.126.40:8000`

### 2. Start Frontend Server
From the frontend directory:
```bash
cd frontend
npm run dev
```
Frontend will be accessible at:
- Local: `http://localhost:3000`
- Network: `http://10.225.126.40:3000`

### 3. Access from Other Devices

On any device connected to the same Wi-Fi network:
1. Open a web browser
2. Go to: `http://10.225.126.40:3000`
3. The app should load!

## Important Notes

### Windows Firewall
If you can't access from other devices, you may need to allow Node.js through Windows Firewall:

1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Find "Node.js" and check both "Private" and "Public"
4. If Node.js isn't listed, click "Allow another app" and add it

### Same Network Required
- All devices must be on the same Wi-Fi network
- Mobile data won't work - must use Wi-Fi

### IP Address Changes
- Your IP address may change if you reconnect to Wi-Fi
- If it stops working, run `ipconfig` again to get the new IP

## Troubleshooting

**Can't connect from other devices?**
1. ✅ Check both servers are running
2. ✅ Verify devices are on same Wi-Fi
3. ✅ Check Windows Firewall settings
4. ✅ Try accessing from the same computer first: `http://10.225.126.40:3000`

**Connection refused errors?**
- Make sure backend is running
- Check that port 8000 isn't blocked
- Verify HOST is set to `0.0.0.0` in backend

**CORS errors?**
- Backend is configured to allow all origins
- Make sure backend is running and accessible

## Testing

1. On your computer: Open `http://localhost:3000` ✅
2. On your computer: Open `http://10.225.126.40:3000` ✅
3. On phone/tablet: Open `http://10.225.126.40:3000` ✅

If all three work, you're all set!

