import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CompanyInfoContextProvider } from "./store/companyContext";
import router from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CompanyInfoContextProvider>
      <RouterProvider router={router} />
    </CompanyInfoContextProvider>
  </React.StrictMode>
);