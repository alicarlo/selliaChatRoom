export interface IAuth {
	email: string,
  password: string
}

export interface IUser  {
	id: string,
	firstName: string,
	lastName: string,
	nickName: string,
	email: string,
	token: string
}

export interface UserState {
  user: IUser | null
}

export interface RootState {
  user: IUser | null;
}