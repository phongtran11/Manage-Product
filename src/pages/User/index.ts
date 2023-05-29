import { lazy } from "react";

export const User = lazy(() => import("./User"));

export * from "./user.enum";
export * from "./user.type";
