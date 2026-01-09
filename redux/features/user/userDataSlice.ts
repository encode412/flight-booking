import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataState {
  userData: Record<string, any> | null;
}

const initialState: UserDataState = {
  userData: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Record<string, any>>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;

export default userDataSlice;
