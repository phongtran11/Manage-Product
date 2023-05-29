import { useMutation, useQuery } from "react-query";
import { InstanceAxios } from "./baseApi";
import { saveStorage } from "../util";
import { AxiosError } from "axios";
import { ERoles, TListUserResponse } from "@/pages";

export const userUri = {
  signIn: "/auth/signIn",
  signUp: "/auth/signUp",
  listUser: "/user/list",
  deleteUser: "user/delete",
};

export type TSignup = {
  username: string;
  password: string;
  displayname: string;
  role: string;
};

export type TQueryListUser = {
  page: number;
  limit: number;
  role?: ERoles;
};

export const useMutateLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const res = await InstanceAxios.post(userUri.signIn, {
        username,
        password,
      });

      return res.data;
    },
    onSuccess(data) {
      saveStorage("access_token", data.access_token);
      saveStorage("user", JSON.stringify(data.user));
    },
    onError(error: AxiosError) {
      console.log(error);
    },
  });
};

export const useMutateRegister = () => {
  return useMutation({
    mutationKey: [],
    mutationFn: async (payload: TSignup) => {
      const res = await InstanceAxios.post(userUri.signUp, { ...payload });

      return res.data;
    },
    onError(error: AxiosError<{ message: string }>) {
      console.log(error);
    },
  });
};

export const useQueryUserList = (query: TQueryListUser, enabled?: boolean) => {
  return useQuery({
    queryKey: [userUri.listUser, Object.entries(query)],
    queryFn: async () => {
      const res = await InstanceAxios.get(userUri.listUser, {
        params: query,
      });

      return res.data as TListUserResponse;
    },
    enabled,
  });
};

export const useMutateDeleteUser = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await InstanceAxios.delete(`${userUri.deleteUser}/${userId}`);
      return res.data;
    },
    onError(error: AxiosError<{ message: string }>) {
      console.log(error);
    },
  });
};
