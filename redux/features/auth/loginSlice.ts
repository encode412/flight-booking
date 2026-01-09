import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

import { setToken, clearToken } from "./tokenSlice";
import { setUserData } from "../user/userDataSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  userLogin: null,
  isLoggedIn: false,
  error: null,
};

export const loginAuth = createAsyncThunk(
  "login/loginAuth",
  async (data, { dispatch }) => {
    return axios
      .post(`${BASE_URL}/api/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const access_token = response.data?.token;
        dispatch(setToken(access_token));
        dispatch(setUserData(response.data?.user));
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const logoutUser = createAsyncThunk(
  "login/logout",
  async (data, { dispatch }) => {
    return axios
      .post(`${BASE_URL}/api/auth/user/logout`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Logged out successfully");
        dispatch(clearToken());
        dispatch(logout());
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userLogin = null;
      toast.success("Logged out");
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload?.token) {
        state.success = true;
        state.userLogin = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        toast.success("Login successful");
      } else {
        state.success = false;
        state.userLogin = null;
        state.isLoggedIn = false;
      }
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.userLogin = null;
      state.isLoggedIn = true;
    });
  },
});

export const { logout, resetError } = loginSlice.actions;

export default loginSlice;
