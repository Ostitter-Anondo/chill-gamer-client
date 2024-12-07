import PropTypes from 'prop-types';
import { useContext } from 'react';
import Context from './Context';
import Navbar from '../pages/components/Navbar';
import Footer from '../pages/components/Footer';
import { Link, useLoaderData } from 'react-router';

import intruder from '../assets/intruder.png'

const SuperPrivateRoute = ({children}) => {
  const { userData } = useContext(Context);
  const article = useLoaderData();
  
  if (article.email === userData.emailVal) {
    return children;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
      <div className="w-full flex flex-col items-center gap-12 my-12">
      <img src={intruder} alt="404" className="size-48" />
      <div className="w-8/12 flex flex-col gap-6 text-center">
        <h1 className="text-7xl font-black text-warning">oops...</h1>
        <h2 className="text-4xl font-semibold text-info">looks like you are not supposed to be here... wanna head back?</h2>
        <Link to={-1} className="btn btn-link btn-lg">Return to previous page</Link>
      </div>
    </div>
      </main>
      <Footer />
    </>
  );
};

SuperPrivateRoute.propTypes = {
  children: PropTypes.node
};

export default SuperPrivateRoute;