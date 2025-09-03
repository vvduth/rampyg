/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { User } from "@clerk/nextjs/server";
import { Clerk } from "@clerk/clerk-js";
import { toast } from "sonner";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.data) {
      result.data = result.data.data;
    }

    return result;
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      error: { status: "FETCH_ERROR", error: errorMessage },
    };
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses", "Users"],
  endpoints: (build) => ({
    updateUser: build.mutation<User, Partial<User> & { userId: string }>({
      query: ({ userId, ...updatedUser }) => ({
        url: `users/clerk/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),
    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: "courses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),
    getCourse: build.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),
  }),
});

export const { useUpdateUserMutation, useGetCoursesQuery, useGetCourseQuery } =
  api;
