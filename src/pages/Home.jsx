import { Typewriter } from "react-simple-typewriter";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Banner from "./Home/Banner";
import { useContext, useEffect, useState } from "react";
import ReviewsMap from "./AllReviews/ReviewsMap";
import Context from "../utils/Context";
import { Link, useLoaderData } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  const { userData } = useContext(Context);
  const topReviews = useLoaderData();
  const [bestGame, setBestGame] = useState([]);
  const [worstGame, setWorstGame] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_expressApiUrl}/topreviews/1`)
      .then((res) => res.json())
      .then((data) => setBestGame(data))
      .catch((err) => console.log(err));
    fetch(`${import.meta.env.VITE_expressApiUrl}/bottomreviews/1`)
      .then((res) => res.json())
      .then((data) => setWorstGame(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer</title>
        </Helmet>
      </HelmetProvider>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12">
        <div className="w-11/12 mx-auto my-6">
          <h1 className="font-bold text-5xl">
            Check out the latest{" "}
            <span className="font-extrabold text-primary">
              <Typewriter
                words={["Games", "Reviews", "Gaming News"]}
                loop={0}
              />
            </span>
          </h1>
        </div>
        <div className="bg-base-200 py-12">
          <Banner />
        </div>
        <div className="my-12 w-11/12 mx-auto">
          <h1 className="font-bold text-5xl">Check out our top rated games:</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-6 my-6">
            <ReviewsMap reviewList={topReviews} />
          </div>
        </div>
        <div className="w-fit mx-auto flex flex-col items-center gap-6 px-6 text-center">
          {userData ? (
            <>
              <h3 className="font-bold text-xl">
                Welcome back,{" "}
                <span className="text-secondary">{userData.nameVal}</span>
              </h3>
              <img
                src={userData.photoVal}
                className="rounded-full w-5/12 shadow-2xl"
                alt=""
              />
              <h4 className="font-semibold text-lg">
                Would you like to check out your profile?
              </h4>
              <Link
                to="/dashboard"
                className="btn btn-lg min-h-0 p-3 h-fit btn-primary text-primary-content"
              >
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <h3 className="font-bold text-xl">
                Hello there, <span className="text-secondary">new guy!</span>
              </h3>
              <h4 className="font-semibold text-lg">
                Are you just here to look around or are you here to stay? why
                not join us?
              </h4>
              <ul className="menu menu-horizontal p-1 items-center border border-base-300 bg-base-200 rounded-xl">
                <li>
                  <Link
                    to="/login"
                    className="border-r border-base-300 rounded-r-none rounded-l-lg"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="border-l border-base-300 rounded-r-lg rounded-l-none"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
        <div className="grid md:grid-cols-2 p-6 mx-auto gap-6 my-6 bg-base-200">
          <h1 className="font-bold text-5xl md:col-span-2">Check out our highest and lowest rated games:</h1>
          <div>
            <ReviewsMap reviewList={bestGame} />
          </div>
          <div>
            <ReviewsMap reviewList={worstGame} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
