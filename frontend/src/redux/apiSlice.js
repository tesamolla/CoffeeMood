import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (builder) => ({
    getCafes: builder.query({
      query: () => "/cafes",
    }),
  }),
});

export const { useGetCafesQuery } = apiSlice;