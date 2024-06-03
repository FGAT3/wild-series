import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
// import CategoryEdit from "./pages/CategoryEdit";
// import useFetch from "./hooks/useFetch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/categories",
        element: <Categories />,
        loader: async () => {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/categories`,
            {
              method: "GET", // GET est la méthode par défaut donc facultatif
              headers: {
                "Content-Type": "application/json", // Facultatif pour une requête GET
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          return data;
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          const name = formData.get("name");

          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/categories`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Network response was not ok ${response.statusText}`
            );
          }
          const responseData = await response.json();
          return redirect(`/categories/${responseData.insertId}`);
        },
      },
      {
        path: "/categories/:id",
        element: <CategoryDetails />,
        loader: async ({ params }) => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${params.id}`);

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          return data;
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
