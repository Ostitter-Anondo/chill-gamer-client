import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { PiPasswordBold } from "react-icons/pi";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";
import { RiImageCircleAiLine } from "react-icons/ri";
import Context from "../utils/Context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signupMailPass } = useContext(Context);

  const signupBehavior = (e) => {
    e.preventDefault();
    const nameVal = e.target.name.value;
    const emailVal = e.target.email.value;
    const photoVal = e.target.photo.value;
    const passwordVal = e.target.password.value;

    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!mailRegex.test(emailVal)) {
      toast.error(`invalid email`, {
        style: {
          padding: '16px',
          background: '#ff4d52',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ff4d52',
        },
      });
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(passwordVal)) {
      toast.error(`password must be at least 6 characters long\npassword must have at least one uppercase and one lowercase letter`, {
        style: {
          padding: '16px',
          background: '#ff4d52',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ff4d52',
        },
      });
      return;
    }

    signupMailPass(emailVal, passwordVal)
      .then(result=>{
        console.log(result.user);
        const uid = result.user.uid;
        const newUser = {uid, nameVal, emailVal, photoVal};
        fetch('http://localhost:5120/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
      })
      .then(()=>{
        toast.success(`signup successful`, {
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
      .catch((err)=>{
        toast.error(`signup failed: ${err.message}`, {
          style: {
            padding: '16px',
            background: '#ff4d52',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ff4d52',
          },
        });
        console.log(err)
      });
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="my-12">
        <form
          onSubmit={signupBehavior}
          className="flex flex-col w-7/12 items-center mx-auto gap-6"
        >
          <label className="w-full input input-bordered flex items-center gap-2">
            <BiUserCircle />
            <input
              type="text"
              className="grow"
              placeholder="Name"
              name="name"
              required
            />
          </label>
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
          <label className="w-full input input-bordered flex items-center gap-2">
            <RiImageCircleAiLine />
            <input
              type="text"
              className="grow"
              placeholder="Photo URL"
              name="photo"
              required
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
      </main>
      <Footer />
    </>
  );
};

export default Signup;
