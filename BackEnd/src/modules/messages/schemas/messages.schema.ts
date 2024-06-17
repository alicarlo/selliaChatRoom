import { Schema } from 'mongoose';

export const MessagesSchema = new Schema({
	chatId: String,
	senderId: String,
  receiverId: String,
  message: String,
  timestamp: Date,
  read: Boolean,
	type: Number
})
