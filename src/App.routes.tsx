import { Navigate, Route, Routes } from "react-router";
import { TRoute } from "./types";
import { AuthRoutes, InvoiceRoutes, UserRoutes } from "./routes";
import { MainLayout } from "./components/Layout/Layout";
import { AuthWrapper } from "./HOC";
import { Suspense } from "react";
import { NotFound } from "./pages";
import { Spin } from "antd";

const NotFoundRoute: TRoute[] = [
  {
    path: "/404",
    component: NotFound,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const MainLayoutRoute: TRoute[] = [
  {
    path: "/",
    component: MainLayout,
    permission: "view",
    children: [...UserRoutes, ...InvoiceRoutes, ...NotFoundRoute],
  },
];

const routes: TRoute[] = [...AuthRoutes, ...MainLayoutRoute];

export const Router = () => {
  const renderRoutes = (routes: TRoute[]) =>
    routes.map(({ path, component: Component, children }) => {
      if (path === "*")
        return <Route key="*" path="*" element={<Navigate to="/404" />} />;

      return (
        <Route
          key={path}
          path={path}
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spin size="large"></Spin>
                </div>
              }
            >
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
