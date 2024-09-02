import mongoose, { Document, Schema } from 'mongoose';
import { encrypt, decrypt } from '../libs/encryption';

export interface TopicDocument extends Document {
  content: string;
}

const TopicSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      get: decrypt,
      set: encrypt,
    },
  },
  {
    timestamps: true,
  }
);

export const Topic = mongoose.models.Topic || mongoose.model<TopicDocument>('Topic', TopicSchema);
