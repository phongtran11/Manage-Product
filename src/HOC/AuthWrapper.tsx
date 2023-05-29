import { RootPaths } from "@/routes";
import { useUser } from "@/store";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { userData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData?.access_token) navigate(RootPaths.LOGIN);
  }, [userData?.access_token, navigate]);

  return <div>{children}</div>;
};
