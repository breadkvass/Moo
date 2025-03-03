import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CompanyInfoContextProvider } from "./utils/companyContext";
import router from "./App";
import "./index.css";
import { AuthContextProvider } from "./utils/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CompanyInfoContextProvider>
        <RouterProvider router={router} />
      </CompanyInfoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);