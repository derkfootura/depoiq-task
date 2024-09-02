import mongoose, { Document, Schema } from 'mongoose';
import { encrypt, decrypt } from '../libs/encryption';

export interface DeponentDocument extends Document {
  name: string;
}

const DeponentSchema = new Schema({
  name: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
});

export const Deponent = mongoose.models.Deponent || mongoose.model<DeponentDocument>('Deponent', DeponentSchema);

// Seed function
export async function seedDeponents() {
  const count = await Deponent.countDocuments();
  if (count === 0) {
    const deponents = [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Bob Johnson' },
      { name: 'Alice Brown' },
      { name: 'Charlie Wilson' },
    ];

    await Deponent.insertMany(deponents);
  }
}
