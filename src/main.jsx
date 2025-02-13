import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Hero } from "./hero.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UiComponent } from "./uiComponent.jsx";
import { ContextProvider } from "../src/contextContainer/contexProvide.jsx";
import { Forecast } from "./foreCasr.jsx";
let routing = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "Weather",
        element: <Hero />,
        children: [
          {
            path: "ForeCast",
            element: <Forecast />,
          },
          {
            path: "",
            element: <UiComponent />,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={routing}></RouterProvider>
    </ContextProvider>
  </StrictMode>
);
