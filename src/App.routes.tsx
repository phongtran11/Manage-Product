import { Route, Routes } from "react-router";
import { TRoute } from "./types";
import { AuthRoutes, DashBoardRoute, UserRoutes } from "./routes";
import { MainLayout } from "./components/Layout/Layout";
import { AuthWrapper } from "./HOC";
import { Suspense } from "react";

const MainLayoutRoute: TRoute[] = [
  {
    path: "/",
    component: MainLayout,
    permission: "view",
    children: [...DashBoardRoute, ...UserRoutes],
  },
];

const routes: TRoute[] = [...AuthRoutes, ...MainLayoutRoute];

export const Router = () => {
  const renderRoutes = (routes: TRoute[]) =>
    routes.map(({ path, component: Component, children }) => {
      return (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback="loading">
              <Component />
            </Suspense>
          }
        >
          {children && children.length > 0 && renderRoutes(children)}
        </Route>
      );
    });

  return (
    <AuthWrapper>
      <Routes>{renderRoutes(routes)}</Routes>
    </AuthWrapper>
  );
};
