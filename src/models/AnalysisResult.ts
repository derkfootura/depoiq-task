import mongoose, { Document, Schema } from 'mongoose';
import { encrypt, decrypt } from '../libs/encryption';

export interface AnalysisResultDocument extends Document {
  topic: mongoose.Types.ObjectId;
  deponent: mongoose.Types.ObjectId;
  content: string;
  fromTime: string;
  toTime: string;
  score: number;
}

const AnalysisResultSchema = new Schema({
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  deponent: { type: Schema.Types.ObjectId, ref: 'Deponent', required: true },
  content: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
  fromTime: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
  toTime: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
  score: {
    type: String,
    required: true,
    get: (value: string) => parseFloat(decrypt(value)),
    set: (value: number) => encrypt(value.toString()),
  },
});

export const AnalysisResult = mongoose.models.AnalysisResult || mongoose.model<AnalysisResultDocument>('AnalysisResult', AnalysisResultSchema);
