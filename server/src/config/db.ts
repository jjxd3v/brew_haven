import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined. Set it in BrewHaven/.env or server/.env.'
    );
  }
  if (uri.includes('127.0.0.1') || uri.includes('localhost')) {
    console.warn(
      '[db] Using local MongoDB. For Atlas, set MONGODB_URI in .env to mongodb+srv://...'
    );
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
