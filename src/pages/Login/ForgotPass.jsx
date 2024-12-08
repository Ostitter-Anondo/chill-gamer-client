import { Helmet, HelmetProvider } from "react-helmet-async";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router";

const ForgotPass = () => {
  const resetBehavior = (e) => {
    e.preventDefault;
  }
  return (
    <div className="w-full">
      <HelmetProvider>
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
      </HelmetProvider>
      <form onSubmit={resetBehavior} className="flex flex-col w-11/12 md:w-9/12 lg:w-7/12 items-center mx-auto gap-6">
        <label className="w-full input input-bordered flex items-center gap-2">
          <HiOutlineMail />
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
            required
          />
        </label>
        <button
          className="btn btn-wide btn-lg btn-warning btn-outline"
          type="submit"
        >
          Reset Password
        </button>
      </form>
      <div className="w-fit my-12 mx-auto">
        <Link to='/login' className="btn btn-link btn-lg mx-auto">Return to Log in Screen</Link>
      </div>
    </div>
  );
};

export default ForgotPass;
