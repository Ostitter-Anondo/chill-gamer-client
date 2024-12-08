import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Markdown from "react-markdown";
import { FaArrowLeft } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import Context from "../utils/Context";
import toast from "react-hot-toast";

const ReviewDeets = () => {
  const { userData } = useContext(Context);

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
        <header className="sticky top-0 z-50">
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

  const handleAddWatchlist = () => {
    fetch(`${import.meta.env.VITE_expressApiUrl}/watchlist/${userData.uid}`)
      .then((res) => res.json())
      .then((watchlistData) => {
        const watchlistVal = watchlistData.watchlist;
        if (watchlistVal) {
          if (watchlistVal.includes(review._id)) {
            toast.error(`article already in watchlist`);
          } else {
            fetch(
              `${import.meta.env.VITE_expressApiUrl}/watchlist/${
                watchlistData.uid
              }`,
              {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  watchlist: [...watchlistVal, review._id],
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
              })
              .catch(err => console.log(err));
          }
        } else {
          fetch(
            `${import.meta.env.VITE_expressApiUrl}/watchlist/${
              watchlistData.uid
            }`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ watchlist: [review._id] }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch(err => console.log(err));
        }
      })
      .then(() => {
        toast.success(`watchlist updated`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12">
        <div className="px-12">
          <Link to={-1} className="btn btn-circle ">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 w-11/12 mx-auto">
          <div className="flex gap-3">
            <h1 className="font-extrabold text-5xl">{review.title}</h1>
            <div className="flex flex-col gap-3">
              <span className="badge badge-secondary font-semibold">
                {review.genre}
              </span>
              <span className="badge badge-accent font-semibold">
                {review.year}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex-col justify-center items-start bg-base-200 border-base-300 h-fit p-3 rounded-lg">
              <h4 className="font-bold text-primary">{review.name}</h4>
              <h5 className="font-light text-sm">{review.email}</h5>
            </div>

            <div className="flex flex-col gap-3 items-center justify-center">
              <div className="font-bold text-2xl flex place-self-center">
                <ReactStars
                  count={5}
                  value={review.rating}
                  edit={false}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
              <button
                className="btn btn-info btn-outline btn-xs"
                onClick={handleAddWatchlist}
              >
                Add to watchlist
              </button>
            </div>
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
