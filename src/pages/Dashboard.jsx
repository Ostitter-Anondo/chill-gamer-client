import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Context from "../utils/Context";
import { BiUserCircle } from "react-icons/bi";
import { RiImageCircleAiLine } from "react-icons/ri";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Dashboard = () => {
  const { userData, setUserData } = useContext(Context);
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_expressApiUrl}/userreviews/${userData.emailVal}`
    )
      .then((res) => res.json())
      .then((data) => setReviewList(data))
      .catch((err) => console.log(err));
  }, [setReviewList, userData.emailVal]);

  const updateName = (e) => {
    e.preventDefault();
    const user = { name: e.target.name.value, photo: userData.photoVal };
    fetch(`${import.meta.env.VITE_expressApiUrl}/users/${userData.uid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(`${import.meta.env.VITE_expressApiUrl}/users/${userData.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setUserData(data);
          });
        toast.success(`name change successful`, {
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
  const updatePhoto = (e) => {
    e.preventDefault();
    const user = { name: userData.nameVal, photo: e.target.photo.value };
    fetch(`${import.meta.env.VITE_expressApiUrl}/users/${userData.uid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(`${import.meta.env.VITE_expressApiUrl}/users/${userData.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setUserData(data);
          });
        toast.success(`photo change successful`, {
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
          <title>Dashboard</title>
        </Helmet>
      </HelmetProvider>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12 w-full">
        <div className="md:w-10/12 border border-base-300 mx-3 md:mx-auto min-h-96 rounded-xl bg-base-200 grid md:grid-cols-3 p-3 md:p-12 gap-6">
          <div className="col-span-1 mx-auto">
            <img src={userData.photoVal} className="rounded" alt="usrIMG" />
          </div>
          <div className="md:col-span-2 grid gap-12 place-items-center">
            <table className="table table-zebra">
              <tbody className="bg-base-300">
                <tr>
                  <th>Username</th>
                  <td>{userData.nameVal}</td>
                </tr>
                <tr>
                  <th>User Email</th>
                  <td>{userData.emailVal}</td>
                </tr>
                <tr>
                  <th>Articles Written</th>
                  <td>{reviewList.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <ul className="menu  w-full justify-between border border-base-300 rounded-xl">
              <li>
                <Link
                  className="btn btn-outline btn-sm rounded-b-none"
                  to="/addreview"
                >
                  Add a New Review
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-outline btn-sm rounded-none"
                  to="/myreviews"
                >
                  Manage Reviews
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-outline btn-sm rounded-t-none"
                  to="/watchlist"
                >
                  My Watchlist
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 w-full md:col-span-2">
            <form onSubmit={updateName}>
              <label className="w-full input input-bordered flex items-center gap-2">
                <BiUserCircle />
                <input
                  type="text"
                  className="grow"
                  placeholder="Change Username"
                  name="name"
                  required
                />
                <button type="submit" className="btn btn-xs btn-outline">
                  Change
                </button>
              </label>
            </form>
            <form onSubmit={updatePhoto}>
              <label className="w-full input input-bordered flex items-center gap-2">
                <RiImageCircleAiLine />
                <input
                  type="text"
                  className="grow"
                  placeholder="Change Photo (URL)"
                  name="photo"
                  required
                />
                <button type="submit" className="btn btn-xs btn-outline">
                  Change
                </button>
              </label>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
