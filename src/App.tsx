import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage";
import LoginPage from "./pages/loginPage/loginPage";
import ProfilePage from "./pages/profilePage/profilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
  )
);

export default router;