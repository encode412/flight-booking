import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

import { logoutUser } from "../features/auth/loginSlice";

const PROXY = process.env.NEXT_PUBLIC_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: PROXY,
  prepareHeaders: (headers, { getState, extra }) => {
    if (!extra?.skipAuth) {
      const accessToken = getState().tokens?.accessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
    }
    return headers;
  },
});

const baseQueryWithAuthHandling = async (args, api, extraOptions) => {
  const { isLoggedIn } = api.getState().login;

  const result = await baseQuery(args, api, extraOptions);

  if (
    (result?.error?.status === 401 || result?.error?.status === 403) &&
    isLoggedIn
  ) {
    toast.error("Your session has expired. Please log in again.");
    api.dispatch(logoutUser());
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithAuthHandling,
  endpoints: (builder) => ({}),
  refetchOnMountOrArgChange: 1,
});
