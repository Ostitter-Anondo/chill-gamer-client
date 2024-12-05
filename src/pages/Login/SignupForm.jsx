import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { PiPasswordBold } from "react-icons/pi";
import { Link } from "react-router";
import Context from "../../utils/Context";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signupMailPass } = useContext(Context);

  const signupBehavior = (e) => {
    e.preventDefault();
    if (e.target.password.value === e.target.confPassword.value){
      signupMailPass(e.target.email.value, e.target.password.value)
    }
    else {
      toast.error("Passwords don't match")
    }
  }

  return (
    <div>
      <form
        onSubmit={signupBehavior}
        className="flex flex-col w-7/12 items-center mx-auto gap-6"
      >
        <label className="w-full input input-bordered flex items-center gap-2">
          <HiOutlineMail />
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
          />
        </label>
        <label className="w-full input input-bordered flex items-center gap-2">
          <PiPasswordBold />
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            placeholder="Password"
            name="password"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
            className="btn btn-circle btn-ghost btn-sm"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>
        <label className="w-full input input-bordered flex items-center gap-2">
          <PiPasswordBold />
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            placeholder="Confirm Password"
            name="confPassword"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
            className="btn btn-circle btn-ghost btn-sm"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>
        <p className="font-extralight text-sm self-start">
          Already have an account?{" "}
          <Link
            to="/login"
            className="btn btn-link text-accent btn-sm min-h-0 h-fit p-0"
          >
            Log in
          </Link>
        </p>
        <button
          className="btn btn-wide btn-lg btn-info btn-outline"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;