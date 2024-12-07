
import PropTypes from "prop-types";
import LoginForm from "../pages/Login/LoginForm";
import { useContext } from "react";
import Context from "./Context";
import { useLocation } from "react-router";
import Navbar from "../pages/components/Navbar";
import Footer from "../pages/components/Footer";

const PrivateRoute = ({ children }) => {
  const { userData, loading, } = useContext(Context);
  const goToPlace = useLocation().pathname;
  if (loading) {
    return (
      <div className="text-5xl w-full h-screen flex flex-col gap-32 justify-center items-center">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );
  }

  if (userData) {
    return children;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="flex my-24 items-center justify-center">
          <LoginForm goToPlace={goToPlace} />
        </div>
      </main>
      <Footer />
    </>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;