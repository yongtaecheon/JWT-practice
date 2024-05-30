import { createSlice } from "@reduxjs/toolkit";

export interface Board{
  id: number;
  title: string;
  content: string;
  createdAt: string;
  username: string;
}

const initialState: Board[] = [];

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state: Board[], action) => {
      return action.payload;
    }
  }
})

export const { setBoards } = boardsSlice.actions;