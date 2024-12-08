import { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Context from "../utils/Context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router";
import empty from "../assets/empty.png";

const Watchlist = () => {
  const { userData } = useContext(Context);
  
  const watchlist = []

  if (!watchlist || watchlist.length === 0) {
    return (
      <>
        <header>
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
    console.log(id, title);
  };

  return (
    <>
      <header>
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
              {watchlist.map((article) => (
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
