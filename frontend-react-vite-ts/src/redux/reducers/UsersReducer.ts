import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  username: string;
  email: string;
}

export interface UsersState {
  userInfo: UserInfo;
  isLoggedIn: boolean;
  isAccessAuthorized: boolean;
  loginText: string;
}

const initialState: UsersState = {
  userInfo: { username: 'null', email: 'null' },
  isLoggedIn: false,
  isAccessAuthorized: false,
  loginText: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedIn: (state:UsersState, action) => {
      Object.assign(state.userInfo, action.payload);
      state.isLoggedIn = true;
      state.isAccessAuthorized = true;
    },
    setLoggedOut: (state:UsersState) => {
      state.isLoggedIn = false;
      state.isAccessAuthorized = false;
    },
    setLoginText: (state: UsersState, action) => {
      state.loginText = action.payload;
    },
    setAccessExpired: (state: UsersState) => {
      state.isAccessAuthorized = false;
    },
    setAccessAuthorized: (state: UsersState) => {
      state.isAccessAuthorized = true;
    }
  }
});

export const { setLoggedIn, setLoggedOut, setLoginText, setAccessExpired, setAccessAuthorized } = usersSlice.actions;