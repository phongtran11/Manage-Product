import { useMutation } from "react-query";
import { InstanceAxios } from "./baseApi";
import { saveStorage } from "../util";
import { AxiosError, AxiosResponse } from "axios";
import { TLoginRes } from "@/types/models";

export const userUri = {
  signIn: "/auth/signIn",
  signUp: "/auth/signUp",
};

export type TSignup = {
  username: string;
  password: string;
  displayname: string;
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
    mutationFn: async (payload: TSignup) => {
      const res = await InstanceAxios.post(userUri.signUp, { ...payload });

      return res.data;
    },
    onError(error: AxiosError<{ message: string }>) {
      console.log(error);
    },
  });
};
