import { Document } from 'mongoose';

export interface Chats extends Document {
	userIds: Array<String>
}
