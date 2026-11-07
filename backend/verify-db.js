import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
    console.error('----------------------------------------------------');
    console.error('STATUS: Connection FAILED');
    console.error(`Reason: ${error.message}`);
    console.log('----------------------------------------------------');
    process.exit(1);
  }
}

verifyConnection();
