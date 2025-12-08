import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import DetailsProduct from "./pages/DetailsProduct";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import SessionExpiredModal from "./components/auth/SessionExpiredModal";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <SessionExpiredModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/product/:id" element={<DetailsProduct />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
