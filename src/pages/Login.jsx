import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const Login = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Login;