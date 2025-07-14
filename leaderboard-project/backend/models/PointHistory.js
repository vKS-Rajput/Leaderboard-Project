import { Schema, model } from 'mongoose';

const pointHistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pointsAwarded: { type: Number, required: true, min: 1, max: 10 }
}, { timestamps: true });

export default model('PointHistory', pointHistorySchema);
