import { TUserModel } from "@/types/models";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserState = {
  user: TUserModel | undefined;
  access_token: string | undefined;
};

type TUserData = {
  userData: UserState;
  updateUser: (user: UserState | undefined) => void;
};

const userStore = create<TUserData>()(
  devtools(
    persist(
      (set) => ({
        userData: {
          user: undefined,
          access_token: undefined,
        },
        updateUser: (user: UserState | undefined) => set({ userData: user }),
      }),
      {
        name: "user",
      }
    )
  )
);

export const useUser = () => userStore((state) => state);
