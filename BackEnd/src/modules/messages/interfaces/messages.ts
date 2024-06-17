import { Document } from 'mongoose';

export interface Messages extends Document {
	chatId: string,
	senderId: string,
  receiverId: string,
  message: string,
  timestamp: Date,
  read: boolean,
	type: number,
}
