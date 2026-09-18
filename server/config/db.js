import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajaysinh_foundation';
  // Disable buffering so queries fail fast or use fallback instead of hanging for 10s
  mongoose.set('bufferCommands', false);

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Warning: ${error.message}`);
    console.warn('NOTE: MongoDB is not currently reachable. Ensure MongoDB is running locally or provide a valid MONGO_URI in server/.env');
  }
};

export default connectDB;
