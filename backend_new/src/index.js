import dotenv from 'dotenv';
import os from 'os';
import connectDB from './config/database.js';
import app from './app.js';

// Try to load .env from root directory first, then current directory
dotenv.config({
  path: './.env',
});

// If .env not found in root, try backend_new directory
if (!process.env.MONGODB_URI) {
  dotenv.config({
    path: './backend_new/.env',
  });
}

// Function to get local network IP address
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 8000;
    const HOST = process.env.HOST || '0.0.0.0';
    const localIP = getLocalIP();

    const server = app.listen(PORT, HOST, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
      console.log(`🌐 Network access: http://${localIP}:${PORT}`);
      console.log(`\n📋 Troubleshooting Tips:`);
      console.log(`   • If you can't access from other devices:`);
      console.log(`     1. Check Windows Firewall - allow Node.js through firewall`);
      console.log(`     2. Verify both devices are on the same Wi-Fi network`);
      console.log(`     3. Test on same computer first: http://${localIP}:${PORT}`);
      console.log(`   • To allow Node.js through firewall:`);
      console.log(`     Windows Defender Firewall → Allow an app → Find Node.js → Check Private & Public\n`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    if (error.message.includes('MONGODB_URI')) {
      console.error('💡 Please create a .env file with MONGODB_URI=your_connection_string');
    }
    process.exit(1);
  }
};

startServer();