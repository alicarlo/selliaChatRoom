import { Schema } from 'mongoose';

export const ChatsSchema = new Schema({
	userIds: Array<String>
});