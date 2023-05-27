import { Dashboard } from "../pages/Dashboard";
import { TRoute } from "../types";
import { RootPaths } from "./path";

export const DashBoardRoute: TRoute[] = [
  {
    path: RootPaths.DASHBOARD,
    component: Dashboard,
    permission: "view",
  },
];
