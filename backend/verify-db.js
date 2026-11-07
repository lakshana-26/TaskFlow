import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Fix for Windows Node.js querySrv DNS bug by setting reliable DNS servers
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if cannot set servers
}

dotenv.config();

async function verifyConnection() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('ERROR: MONGO_URI is not set in backend/.env');
    process.exit(1);
  }

  const isLocal = uri.includes('127.0.0.1') || uri.includes('localhost');

  try {
    console.log(`Attempting to connect to ${isLocal ? 'local MongoDB' : 'MongoDB Atlas (Cloud)'}...`);
    const conn = await mongoose.connect(uri);
    console.log('----------------------------------------------------');
    console.log('STATUS: Connection SUCCESSFUL!');
    console.log(`Database Name: ${conn.connection.name}`);
    console.log(`Host: ${conn.connection.host}`);
    console.log('----------------------------------------------------');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    const sanitizedMsg = error.message.replace(/mongodb(\+srv)?:\/\/[^@]+@/gi, 'mongodb+srv://***:***@');
    console.error('----------------------------------------------------');
    console.error('STATUS: Connection FAILED');
    console.error(`Reason: ${sanitizedMsg}`);
    console.log('----------------------------------------------------');
    process.exit(1);
  }
}

verifyConnection();
