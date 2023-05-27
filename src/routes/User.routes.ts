import { User } from "../pages";
import { TRoute } from "../types";
import { UserPaths } from "./path";

export const UserRoutes: TRoute[] = [
  {
    path: UserPaths.LIST,
    component: User,
    permission: "view",
  },
];
