export interface IUserData {
  id: number,
  username: string,
  email: string
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