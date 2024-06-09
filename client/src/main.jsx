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
import CategoryEdit from "./pages/CategoryEdit";
import Programs from "./pages/Programs";
import NotFoundPage from "./pages/NotFoundPage";

import fetchJSON from "./services/httpRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/categories",
        element: <Categories />,
        loader: async () => {
          const url = `${import.meta.env.VITE_API_URL}/api/categories`;
          return fetchJSON(url);
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const name = formData.get("name");
          const url = `${import.meta.env.VITE_API_URL}/api/categories`;

          const responseData = await fetchJSON(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });

          return redirect(`/categories/${responseData.insertId}`);
        },
      },
      {
        path: "/categories/:id",
        element: <CategoryDetails />,
        loader: async ({ params }) => {
          const url = `${import.meta.env.VITE_API_URL}/api/categories/${params.id}`;
          return fetchJSON(url);
        },
      },
      {
        path: "/categories/:id/edit",
        element: <CategoryEdit />,
        loader: async ({ params }) => {
          const url = `${import.meta.env.VITE_API_URL}/api/categories/${params.id}`;
          return fetchJSON(url);
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          const url = `${import.meta.env.VITE_API_URL}/api/categories/${params.id}`;

          switch (request.method.toLowerCase()) {
            case "put": {
              await fetchJSON(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formData.get("name") }),
              });
              return redirect(`/categories/${params.id}`);
            }
            case "delete": {
              await fetchJSON(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(),
              });
              return redirect("/categories");
            }
            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/programs",
        element: <Programs />,
        loader: async () => {
          const categories = await fetchJSON(
            `${import.meta.env.VITE_API_URL}/api/categories`
          );
          const programs = await fetchJSON(
            `${import.meta.env.VITE_API_URL}/api/programs`
          );
          return { categories, programs };
        },
        action: async ({ request }) => {
          try {
            const formData = await request.formData();
            const data = Object.fromEntries(formData.entries());

            const { title, category, synopsis, poster, country, year } = data;

            if (
              !title ||
              !category ||
              !synopsis ||
              !poster ||
              !country ||
              !year
            ) {
              throw new Error("All fields are required");
            }

            const url = `${import.meta.env.VITE_API_URL}/api/programs`;

            const responseData = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (responseData.insertId) {
              return redirect(`/programs/${responseData.insertId}`);
            }
            throw new Error("Invalid response from server");
          } catch (error) {
            console.error("Error submitting form:", error);
            return { error: error.message };
          }
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
