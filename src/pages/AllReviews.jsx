import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ReviewsMap from "./AllReviews/ReviewsMap";
import { useLoaderData } from "react-router";
import { FaFilter, FaLayerGroup, FaSortAmountDown } from "react-icons/fa";

const AllReviews = () => {
  const [reviewList, setReviewList] = useState(useLoaderData());
  
  const handleFilter = (e) => {
    e.preventDefault();
    const genre = e.target.genreSelector.value;
    const sort = e.target.sortVal.value;
    fetch(`${import.meta.env.VITE_expressApiUrl}/reviews/${sort}/${genre}`)
      .then(res => res.json())
      .then(data => setReviewList(data))
      .catch(err => console.log(err))
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="my-12">
        <form onSubmit={handleFilter} className="flex justify-end gap-6 items-end my-6 w-11/12 mx-auto">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text flex items-center gap-1">
                <FaSortAmountDown /> Sort by
              </span>
            </div>
            <select className="select select-bordered" name="sortVal">
              <option value="unsorted" selected>
                Unsorted
              </option>
              <option value="rating">By Ratings (highest first)</option>
              <option value="year">By Year (newest first)</option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text flex items-center gap-1">
                <FaLayerGroup /> Filter by genre
              </span>
            </div>
            <select className="select select-bordered" name="genreSelector">
              <option value="All" selected>
                All
              </option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Storytime">Storytime</option>
              <option value="Arcade">Arcade</option>
            </select>
          </label>
          <button className="btn btn-neutral" type="submit"><FaFilter /> Filter</button>
        </form>
        <div className="grid grid-cols-3 w-11/12 mx-auto gap-6">
          <ReviewsMap reviewList={reviewList} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllReviews;
