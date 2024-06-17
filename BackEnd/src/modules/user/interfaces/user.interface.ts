import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
	readonly email: string;
  readonly password: string;
  readonly nickName: string;
	readonly imgProfile: string;
}

export interface UserSearch extends Document {
  readonly nickName: string;
}