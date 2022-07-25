import authService from "../../api/services/AuthService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserLoginData, IUserRegisterData, IUserStoreData } from "../../types";

const user = JSON.parse(localStorage.getItem("user") as string);

interface IAuthState {
  user: IUserStoreData | null,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string
}

const initialState : IAuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

const register = createAsyncThunk(
  "auth/register",
  async (userData: IUserRegisterData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error : any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const login = createAsyncThunk(
  "auth/login",
  async (userData: IUserLoginData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error : any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

let authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      state.user = null;
    })

  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;