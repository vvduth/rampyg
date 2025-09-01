/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { User } from "@clerk/nextjs/server";
import { Clerk } from "@clerk/clerk-js";
import { toast } from "sonner";


const customBaseQuery  = async (
  args: string | FetchArgs, 
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const baseQuery = fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL});

  try {
    const result = await baseQuery(args, api, extraOptions);
   
  } catch (error) {
    
  }
}

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
  reducerPath: "api",
  tagTypes: ["Courses"],
  endpoints: (build) => ({
    getCourses: build.query<Course[], {category?: string}>({
      query: ({category}) => ({
        url: "courses",
        params: {category}
      }), 
      providesTags: ["Courses"]
    }),
    getCourse: build.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }]
    })
  })
});


export const {
  useGetCoursesQuery,
  useGetCourseQuery
} = api;
