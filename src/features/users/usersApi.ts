import type {
  Employee,
  UpdateUserPayload,
  UsersQueryParams,
} from "../../types";
import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<Employee[], UsersQueryParams | undefined>({
      query: (params) =>
        params ? { url: "/users", params } : { url: "/users" },
      providesTags: (result) =>
        result
          ? result.map((user) => ({ type: "Users" as const, id: user._id }))
          : [{ type: "Users" as const }],
    }),

    updateUserRole: builder.mutation<Employee, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      // invalidatesTags: [{ type: "Users" as const }],
      invalidatesTags: (result, error, arg) => [
        { type: "Users" as const, id: arg.id },
      ],
    }),

    getUserById: builder.query<Employee, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users" as const, id }],
    }),

    updateUser: builder.mutation<
      { message: string; user: Employee },
      { id: string; updates: UpdateUserPayload }
    >({
      query: ({ id, updates }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Users" as const, id: arg.id },
        { type: "Users" as const },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = usersApi;
