import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Login = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="my-12">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Login;