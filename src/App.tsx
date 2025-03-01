import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainPage />} />
    </Route>
  )
);

export default router;