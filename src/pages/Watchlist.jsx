import { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Context from "../utils/Context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router";
import empty from "../assets/empty.png";
import Swal from "sweetalert2";

const Watchlist = () => {
  const { userData } = useContext(Context);
  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_expressApiUrl}/watchlist/${userData.uid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.watchlist) {
          setWatchlist(data.watchlist);
          console.log(`watchlist initial data was get`);
        }
      })
      .catch((err) => console.log(err));
  }, [userData.uid]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_expressApiUrl}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.filter((datum) => watchlist.includes(datum._id)));
      })
      .catch((err) => console.log(err));
  }, [watchlist]);

  if (!watchlist || watchlist.length === 0) {
    return (
      <>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main>
          <div className="w-full flex flex-col items-center gap-12 my-12">
            <img src={empty} alt="nodata" className="size-48" />
            <div className="w-8/12 flex flex-col gap-6 text-center">
              <h1 className="text-7xl font-black text-warning">uh oh...</h1>
              <h2 className="text-4xl font-semibold text-info">
                looks like you didn&apos;t add anything to your watchlist...
                want to head back?
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

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${title} review will be removed from your watchlist`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_expressApiUrl}/watchlist/${userData.uid}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              watchlist: watchlist.filter((articleId) => articleId !== id),
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            fetch(
              `${import.meta.env.VITE_expressApiUrl}/watchlist/${userData.uid}`
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.watchlist) {
                  setWatchlist(data.watchlist);
                  console.log(`watchlist initial data was get`);
                  fetch(`${import.meta.env.VITE_expressApiUrl}/reviews`)
                    .then((res) => res.json())
                    .then((data) => {
                      setReviews(
                        data.filter((datum) => watchlist.includes(datum._id))
                      );
                    })
                    .catch((err) => console.log(err));
                }
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12">
        <div className="w-11/12 mx-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Game</th>
                <th>Rating</th>
                <th>Genre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((article) => (
                <tr key={article._id} className="h-full">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={article.cover} alt="articleIMG" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{article.title}</div>
                        <div className="text-sm opacity-50">{article.year}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <ReactStars
                      count={5}
                      value={article.rating}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </td>
                  <td>
                    <span className="badge badge-sm">{article.genre}</span>
                  </td>
                  <th>
                    <div className="flex gap-6 justify-center">
                      <button
                        onClick={() => {
                          handleDelete(article._id, article.title);
                        }}
                        className="btn btn-error btn-xs"
                      >
                        <FaRegTrashCan />
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Game</th>
                <th>Rating</th>
                <th>Genre</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Watchlist;
