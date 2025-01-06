import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="w-full min-h-screen p-6">
      {!isLoginPage && <Navbar />}
      <Outlet />
    </div>
  );
};
export default App;
