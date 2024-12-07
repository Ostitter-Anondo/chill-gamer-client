import { useContext } from "react";
import Navbar from "./components/Navbar";
import Context from "../utils/Context";
import { BiUserCircle } from "react-icons/bi";
import { RiImageCircleAiLine } from "react-icons/ri";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Footer from "./components/Footer";

const Dashboard = () => {
  const { userData, setUserData } = useContext(Context);

  const updateName = (e) => {
    e.preventDefault();
    const user = {name: e.target.name.value, photo: userData.photoVal}
    fetch(`${import.meta.env.VITE_expressApiUrl}/users/${userData.uid}`,{
      method: "PUT",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        fetch(`${import.meta.env.VITE_expressApiUrl}/users/${userData.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setUserData(data);
          });
        toast.success(`name change successful`, {
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
  const updatePhoto = (e) => {
    e.preventDefault();
    const user = {name: userData.nameVal, photo: e.target.photo.value}
    fetch(`${import.meta.env.VITE_expressApiUrl}/users/${userData.uid}`,{
      method: "PUT",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        fetch(`${import.meta.env.VITE_expressApiUrl}/users/${userData.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setUserData(data);
          });
        toast.success(`photo change successful`, {
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
      <main className="my-12 w-full">
        <div className="w-10/12 border border-base-300 mx-auto min-h-96 rounded-xl bg-base-200 grid grid-cols-3 p-12 gap-6">
          <div className="col-span-1">
            <img src={userData.photoVal} className="rounded" alt="usrIMG" />
          </div>
          <div className="col-span-2 grid gap-12 place-items-center">
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
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
            <div>
              <ul className="menu menu-horizontal w-full justify-between border border-base-300 rounded-lg">
                <li>
                  <Link className="btn btn-outline btn-sm rounded-r-none" to='/addreview'>Add a New Review</Link>
                </li>
                <li>
                  <Link className="btn btn-outline btn-sm rounded-none" to='/myreviews'>Manage Reviews</Link>
                </li>
                <li>
                  <Link className="btn btn-outline btn-sm rounded-l-none" to='/watchlist'>My Watchlist</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 w-full">
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
                  <button type="submit" className="btn btn-xs btn-outline">Change</button>
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
                  <button type="submit" className="btn btn-xs btn-outline">Change</button>
                </label>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
