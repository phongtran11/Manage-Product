import { lazy } from "react";

export const NotFound = lazy(
  () => import("./NotFound" /* webpackChunkName: "Page_NotFound" */)
);
