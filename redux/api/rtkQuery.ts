import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { logoutUser } from "../features/auth/loginSlice";
import type { RootState } from "../store";

const PROXY = process.env.NEXT_PUBLIC_BASE_URL;

interface ExtraOptions {
  skipAuth?: boolean;
}

const baseQuery = fetchBaseQuery({
  baseUrl: PROXY,
  prepareHeaders: (headers, { getState, extra }) => {
    const extraOptions = (extra || {}) as ExtraOptions;

    if (!extraOptions?.skipAuth) {
      const state = getState() as RootState;
      const accessToken = state.token?.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
    }
    return headers;
  },
});

const baseQueryWithAuthHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const { isLoggedIn } = state.login;

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
  endpoints: () => ({}),
  refetchOnMountOrArgChange: 1,
});
