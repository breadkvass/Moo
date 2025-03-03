import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage";
import LoginPage from "./pages/loginPage/loginPage";
import ProfilePage from "./pages/profilePage/profilePage";
import { Protected, ProtectedOnlyAuth, ProtectedOnlyUnAuth } from "./components/protectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Protected component={<MainPage />} />} />
      <Route path="/login" element={<ProtectedOnlyUnAuth component={<LoginPage />} />} />
      <Route path="/profile" element={<ProtectedOnlyAuth component={<ProfilePage />} />} />
    </Route>
  )
);

export default router;