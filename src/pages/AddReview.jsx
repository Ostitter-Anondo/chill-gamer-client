import { useContext } from "react";
import Context from "../utils/Context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegFileImage } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import toast from "react-hot-toast";

const AddReview = () => {
  const { userData } = useContext(Context);

  const handleAddReview = (e) => {
    e.preventDefault();

    const newReview = {
      cover: e.target.coverIMG.value,
      title: e.target.title.value,
      rating: e.target.rating.value,
      genre: e.target.genre.value,
      email: e.target.email.value,
      name: e.target.name.value,
      review: e.target.reviewTXT.value,
      year: e.target.year.value,
    }
    
    fetch('http://localhost:5120/reviews', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        toast.success(`review submitted`, {
          style: {
            padding: '16px',
            background: '#4de62e',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#4de62e',
          },
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <>
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
            />
          </label>
          <label className="w-full input input-bordered flex items-center gap-2 col-span-2">
            <MdOutlineTitle />
            <input
              type="text"
              className="grow"
              placeholder="Title"
              name="title"
            />
          </label>
          <select className="select select-warning w-full grow" name="rating">
            <option value={0} disabled selected>
              Rating
            </option>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
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
          <label className="w-full input input-bordered flex items-center gap-2">
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
          <label className="w-full input input-bordered flex items-center gap-2">
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
              className="textarea textarea-lg min-h-48 textarea-bordered h-24"
              placeholder="Review Text"
              name="reviewTXT"
            ></textarea>
          </label>
          <label className="w-full input input-bordered flex items-center gap-2">
            <IoCalendar />
            <input
              type="text"
              className="grow"
              placeholder="Year Published"
              name="year"
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
