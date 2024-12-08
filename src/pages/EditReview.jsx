import { IoCalendar } from "react-icons/io5";
import Footer from "./components/Footer";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineTitle } from "react-icons/md";
import Navbar from "./components/Navbar";
import { FaArrowLeft, FaRegFileImage } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Context from "../utils/Context";
import { Link, useNavigate, useParams } from "react-router";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";

const EditReview = () => {
  const articleId = useParams().id;
  const [article, setArticle] = useState(null);
  const [ratingVal, setRatingVal] = useState(null);
  const { userData } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_expressApiUrl}/review/${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setRatingVal(data.rating);
      })
      .catch((err) => console.log(err));
  }, [articleId]);

  const ratingChanged = (newRating) => {
    setRatingVal(newRating);
  };
  if (!article) {
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Edit Review</title>
          </Helmet>
        </HelmetProvider>
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      cover: e.target.coverIMG.value,
      title: e.target.title.value,
      rating: ratingVal,
      genre: e.target.genre.value,
      email: e.target.email.value,
      name: e.target.name.value,
      review: e.target.reviewTXT.value,
      year: e.target.year.value,
    };
    console.log(newReview);
    fetch(`${import.meta.env.VITE_expressApiUrl}/review/${articleId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(`review edit successful`, {
          style: {
            padding: "16px",
            background: "#4de62e",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#4de62e",
          },
        });
        navigate("/myreviews");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Edit Review</title>
        </Helmet>
      </HelmetProvider>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12">
        <div className="px-6 my-6">
          <Link to={-1} className="btn btn-circle ">
            <FaArrowLeft />
          </Link>
        </div>
        <form
          className="w-11/12 grid grid-cols-2 mx-auto gap-6"
          onSubmit={handleSubmit}
        >
          <label className="w-full input input-bordered flex items-center gap-2 col-span-2">
            <FaRegFileImage />
            <input
              type="text"
              className="grow"
              placeholder="Cover Image (URL)"
              name="coverIMG"
              defaultValue={article.cover}
              required
            />
          </label>
          <label className="w-full input input-bordered flex items-center gap-2 col-span-2">
            <MdOutlineTitle />
            <input
              type="text"
              className="grow"
              placeholder="Title"
              name="title"
              defaultValue={article.title}
              required
            />
          </label>
          <div className="flex place-self-center">
            <ReactStars
              count={5}
              value={article.rating}
              size={24}
              activeColor="#ffd700"
              onChange={ratingChanged}
            />
          </div>
          <select
            className="select select-info w-full grow"
            defaultValue={article.genre}
            name="genre"
          >
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Storytime">Storytime</option>
            <option value="Arcade">Arcade</option>
          </select>
          <label className="w-full col-span-2 md:col-span-1 input input-bordered flex items-center gap-2">
            <HiOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              value={userData.emailVal}
              disabled
            />
          </label>
          <label className="w-full col-span-2 md:col-span-1 input input-bordered flex items-center gap-2">
            <BiUserCircle />
            <input
              type="text"
              className="grow"
              placeholder="Name"
              name="name"
              value={userData.nameVal}
              disabled
            />
          </label>
          <label className="form-control col-span-2">
            <div className="label">
              <span className="label-text-alt">Write in markdown</span>
              <span className="label-text-alt">
                <a
                  className="btn btn-link btn-xs p-0 min-h-0"
                  href="https://www.markdownguide.org/cheat-sheet/"
                  target="_blank"
                >
                  Markdown Cheat Sheet
                </a>
              </span>
            </div>
            <textarea
              className="textarea textarea-lg min-h-screen textarea-bordered h-24"
              placeholder="Review Text"
              name="reviewTXT"
              defaultValue={article.review}
              required
            ></textarea>
          </label>
          <label className="w-full input input-bordered flex items-center gap-2">
            <IoCalendar />
            <input
              type="number"
              className="grow"
              placeholder="Year Published"
              name="year"
              defaultValue={Number(article.year)}
              required
            />
          </label>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default EditReview;
