export interface IUserStoreData {
  _id: number,
  username: string,
  email: string,
  token?: string
}

export interface IUserLoginData {
  username: string,
  password: string
}

export interface IUserRegisterData {
  username: string,
  email: string,
  password: string
}

export interface IUser {
  _id: number,
  username: string,
  email: string,
  password: string
}

export interface ITodo {
  _id: number,
  text: string,
  completed: boolean,
  user_id: number
}