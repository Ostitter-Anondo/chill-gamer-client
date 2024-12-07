
import PropTypes from "prop-types";
import LoginForm from "../pages/Login/LoginForm";
import { useContext } from "react";
import Context from "./Context";
import { Link, useLocation } from "react-router";
import Navbar from "../pages/components/Navbar";
import Footer from "../pages/components/Footer";

const PrivateRoute = ({ children }) => {
  const { userData, loading, } = useContext(Context);
  const goToPlace = useLocation().pathname;
  if (loading) {
    return (
      <div className="text-5xl w-full h-screen flex flex-col gap-32 justify-center items-center">
        <span className="loading loading-ball loading-lg"></span>
        <div className="w-8/12 flex flex-col gap-6 text-center">
            <h1 className="text-7xl font-black text-warning">Please wait...</h1>
            <h2 className="text-4xl font-semibold text-info">
              looks like this is taking longer than expected... wanna head back?
            </h2>
            <Link to={-1} className="btn btn-link btn-lg">
              Return to previous page
            </Link>
          </div>
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