import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactStars from "react-rating-stars-component";

const ReviewsMap = ({reviewList}) => {
  return (
    <>
      {reviewList.map((review) => (
        <div key={review._id} className="card bg-base-100 shadow-xl">
          <figure className="h-48">
            <img
              src={review.cover}
              alt="Shoes"
              className="object-contain w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {review.title}
              <div className="badge badge-secondary">{review.year}</div>
            </h2>
            <p className='font-light'>by <span className="text-primary">{review.name}</span></p>
            <ReactStars
              count={5}
              value={review.rating}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            <div className="card-actions justify-between items-center">
              <Link
                to={`/review/${review._id}`}
                className="btn btn-info btn-sm rounded-full"
              >
                Details...
              </Link>
              <div className="badge badge-outline">{review.genre}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

ReviewsMap.propTypes = {
  reviewList: PropTypes.array
};

export default ReviewsMap;