import { Link } from "react-router";
import ReactStars from "react-rating-stars-component";
import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Context from "../utils/Context";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { userData } = useContext(Context);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5120/myreviews/${userData.emailVal}`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.log(err));
  });
  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${title} review will be deleted`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5120/review/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              fetch(`http://localhost:5120/myreviews/${userData.emailVal}`)
                .then((res) => res.json())
                .then((data) => setArticles(data))
                .catch((err) => console.log(err));
            }
          });
      }
    });
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
              {articles.map((article) => (
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
                      <Link className="btn btn-info btn-xs">
                        <FaEdit /> Edit
                      </Link>
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

export default MyReviews;
