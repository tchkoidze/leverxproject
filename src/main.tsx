import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Employees from "./pages/Employees.tsx";
import RolesAndPermissions from "./pages/RolesAndPermissions.tsx";
import Login from "./pages/Login.tsx";
import EmployeeDetails from "./pages/EmployeeDetails.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import NotFoundRedirect from "./pages/NotFoundRedirect.tsx";
import SignUp from "./pages/SignUp.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <AuthProvider>
      //   <App />
      // </AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id",
        element: (
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "roles-permissions",
        element: (
          <ProtectedRoute>
            <RolesAndPermissions />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      { path: "*", element: <NotFoundRedirect /> },
      // { path: "*", element: <NotFoundDetailsPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
