import { useContext, useState } from "react";
import Context from "../utils/Context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegFileImage } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AddReview = () => {
  const { userData } = useContext(Context);
  const [ratingVal, setRatingVal] = useState(null);

  const navigate = useNavigate();

  const ratingChanged = (newRating) => {
    setRatingVal(newRating);
  };

  const handleAddReview = (e) => {
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

    fetch(`${import.meta.env.VITE_expressApiUrl}/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/reviews")
        toast.success(`review submitted`, {
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Add Review</title>
        </Helmet>
      </HelmetProvider>
      <header>
        <Navbar />
      </header>
      <main className="my-12">
        <form
          className="w-11/12 grid grid-cols-2 mx-auto gap-6"
          onSubmit={handleAddReview}
        >
          <label className="w-full input input-bordered flex items-center gap-2 col-span-2">
            <FaRegFileImage />
            <input
              type="text"
              className="grow"
              placeholder="Cover Image (URL)"
              name="coverIMG"
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
              required
            />
          </label>
          <div className="flex place-self-center">
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              onChange={ratingChanged}
            />
          </div>
          <select className="select select-info w-full grow" name="genre">
            <option value="n/a" disabled selected>
              Genre
            </option>
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

export default AddReview;
