import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
	email: String,
  password: String,
  nickName: String,
	imgProfile: String
}, { collection: 'usersData' });