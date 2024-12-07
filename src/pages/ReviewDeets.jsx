import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Markdown from "react-markdown";
import { FaArrowLeft } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const ReviewDeets = () => {
  const location = useParams().id;
  const [review, setReview] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_expressApiUrl}/review/${location}`)
      .then((res) => res.json())
      .then((data) => setReview(data))
      .catch((err) => console.log(err));
  }, [location]);
  if (!review) {
    return (
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <div className="w-full flex flex-col items-center gap-12 my-12">
            <span className="loading loading-bars loading-lg"></span>
            <div className="w-8/12 flex flex-col gap-6 text-center">
              <h1 className="text-7xl font-black text-warning">
                Please wait...
              </h1>
              <h2 className="text-4xl font-semibold text-info">
                Your data isn&apos;t quite here yet... care to wait a bit?
              </h2>
              <Link to={-1} className="btn btn-link btn-lg">
                Return to previous page
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="my-12">
        <div className="px-12">
          <Link to={-1} className="btn btn-circle ">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 w-11/12 mx-auto">
          <h1 className="font-extrabold text-5xl">{review.title}</h1>
          <div className="flex items-center justify-between w-full">
            <div className="flex-col justify-center items-start bg-base-200 border-base-300 h-fit p-3 rounded-lg">
              <h4 className="font-bold text-primary">{review.name}</h4>
              <h5 className="font-light text-sm">{review.email}</h5>
            </div>
            <div className="flex gap-3">
              <span className="badge badge-secondary font-semibold">
                {review.genre}
              </span>
              <span className="badge badge-accent font-semibold">
                {review.year}
              </span>
            </div>
            <h3 className="font-bold text-2xl">
              <div className="flex place-self-center">
                {review ? (
                  <ReactStars
                    count={5}
                    value={review.rating}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                ) : (
                  <></>
                )}
              </div>
            </h3>
          </div>
          <img src={review.cover} className="h-72 rounded-sm" alt="" />
          <div className="text-justify font-light">
            <Markdown>{review.review}</Markdown>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReviewDeets;
