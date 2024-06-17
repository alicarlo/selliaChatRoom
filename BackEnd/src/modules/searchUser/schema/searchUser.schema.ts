import { Schema, Document } from 'mongoose';

export interface UserSearch extends Document {
  nickName: string;
}

export const UserSearchSchema = new Schema({
  nickName: { type: String, required: true },
});