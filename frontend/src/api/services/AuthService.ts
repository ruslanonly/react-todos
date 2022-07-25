import axios from "axios";

import { IUserLoginData, IUserRegisterData, IUserStoreData } from "../../types";

async function register(registerData: IUserRegisterData) {
  let response = await axios.post<IUserStoreData>("auth/register", registerData);
  let newUser = response.data;
  return newUser;
}

async function login(loginData: IUserLoginData) {
  let response = await axios.post<IUserStoreData>("auth/login", loginData);
  let user = response.data;
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } 
  return user;
}

export const logout = () => {
  localStorage.removeItem("user");
}

const TodoService = {
  register,
  login,
  logout
}

export default TodoService;