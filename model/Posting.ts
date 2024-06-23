import mongoose from 'mongoose';
import { CarpoolPost_type } from '@/types/types';

const { Schema } = mongoose;

const carpoolPostSchema = new Schema<CarpoolPost_type>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  occupiedSeats: {
    type: Number,
    default: 0,
    min: 0,
  },
  occupants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  notes: {
    type: String,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CarpoolPost || mongoose.model<CarpoolPost_type>("CarpoolPost",carpoolPostSchema);
