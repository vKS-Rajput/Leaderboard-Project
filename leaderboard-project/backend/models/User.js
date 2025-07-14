import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, default: 0 }
}, { timestamps: true });

export default model('User', userSchema);
