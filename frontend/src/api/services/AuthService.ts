import axios from "axios";

import { IUserLoginData, IUserRegisterData, IUserStoreData } from "../../types";

async function register(registerData: IUserRegisterData) {
  let newUser = await axios.post<null, IUserStoreData>("auth/register", registerData);
  return newUser;
}

async function login(loginData: IUserLoginData) {
  let response = await axios.post<IUserStoreData>("auth/login", loginData);
  let user = response.data as IUserStoreData;
  localStorage.setItem("user", JSON.stringify(user));
}

const TodoService = {
  register,
  login
}

export default TodoService;