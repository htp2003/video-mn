import { useRoutes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import MainLayout from "../layouts/main-layout";

import VideoList from "../features/videos/video-list";
import VideoDetail from "../features/videos/video-detail";
import Login from "../features/auth/login";
import SettingPage from "../features/setting/setting";

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <ProtectedRoute allowedRoles={["admin", "user"]} />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            { index: true, element: <Navigate to="/videos" replace /> },
            { path: "dashboard", element: <div>Dashboard</div> },
            { path: "videos", element: <VideoList /> },
            { path: "videos/create", element: <VideoDetail /> },
            { path: "videos/:id", element: <VideoDetail /> },
            {
              element: <ProtectedRoute allowedRoles={["admin"]} />,
              children: [{ path: "settings", element: <SettingPage /> }],
            },
          ],
        },
      ],
    },

    { path: "*", element: <div>404 Not Found</div> },
  ]);

  return elements;
};
