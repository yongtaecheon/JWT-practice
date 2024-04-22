import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  username: string;
  email: string;
}

export interface UsersState {
  userInfo: UserInfo,
  isLoggedIn: boolean
}

const initialState: UsersState = {
  userInfo: { username: 'null', email: 'null' },
  isLoggedIn: false,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedIn: (state:UsersState, action) => {
      Object.assign(state.userInfo, action.payload);
      state.isLoggedIn = true;
    },
    setLoggedOut: (state:UsersState) => {
      state.isLoggedIn = false;
    }
  }
});

export const { setLoggedIn, setLoggedOut } = usersSlice.actions;