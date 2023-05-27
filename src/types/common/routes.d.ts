import React from "react";
import { IconType } from "react-icons";
import { TKeyPermission } from "../models/user";

export type TRoute = {
  path: string;
  redirectTo?: string;
  exact?: boolean;
  component: React.ComponentType;
  children?: TRoute[];
  permission?: TKeyPermission;
  breadcrumb?: BreadcrumbComponentType<ParamKey> | string | null;
  showInMenu?: boolean;
  menuIcon?: IconType;
  menuLabel?: string;
  subMenuTitle?: string;
};
