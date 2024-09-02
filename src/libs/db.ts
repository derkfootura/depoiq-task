import mongoose from 'mongoose';
import { seedDeponents } from '../models/Deponent';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI);

  if (mongoose.connection.db) {
    if (await mongoose.connection.db.collection('deponents').countDocuments() === 0) {
      await seedDeponents();
    }
  }
}
