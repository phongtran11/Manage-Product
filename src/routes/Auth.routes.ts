import { Login } from "../pages";
import { TRoute } from "../types";
import { RootPaths } from "./path";

export const AuthRoutes: TRoute[] = [
  {
    path: RootPaths.LOGIN,
    component: Login,
    permission: "view",
  },
];
