import { ObjectId } from "mongodb";
import { Date } from "mongoose";
export interface CarpoolPost_type {
    user: ObjectId,
    startLocation: string,
      endLocation: string,
      date: Date,
      time: string,
      availableSeats: number,
      occupiedSeats: number,
      occupants: ObjectId[],
      notes: string,
      createdAt: Date
}