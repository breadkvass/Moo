import * as React from "react";
import * as ReactDOM from "react-dom/client";
import router from "./App";
import { RouterProvider } from "react-router-dom";
import { CompanyInfoContextProvider } from "./utils/companyContext";
import { AuthContextProvider } from "./utils/authContext";
import { ModalContextProvider } from "./hooks/useModal/useModalProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
        <CompanyInfoContextProvider>
          <ModalContextProvider>
            <RouterProvider router={router} />
          </ModalContextProvider>
        </CompanyInfoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);