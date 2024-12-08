import { BiJoystickButton } from "react-icons/bi";
import { Link, NavLink, useNavigate } from "react-router";
import chillGamer from "../../assets/chill-gamer.png";
import { useContext } from "react";
import Context from "../../utils/Context";

import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { userData, signOutUser, lightTheme, setLightTheme } =
    useContext(Context);

  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {userData ? (
        <>
          <li>
            <NavLink to="/addreview">Add Review</NavLink>
          </li>
          <li>
            <NavLink to="/myreviews">My Reviews</NavLink>
          </li>
          <li>
            <NavLink to="/watchlist">Game Watchlist</NavLink>
          </li>
        </>
      ) : (
        <></>
      )}
      <li>
        <NavLink to="/reviews">All Reviews</NavLink>
      </li>
      <li className="grid lg:place-items-center">
        <input
          type="checkbox"
          value="dim"
          className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
          onChange={() => setLightTheme(!lightTheme)}
          checked={!lightTheme}
        />
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <BiJoystickButton className="size-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <img className="size-7" src={chillGamer} alt="chill" /> Chill Gamer
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {userData ? (
          <div className="menu menu-horizontal items-center gap-3 border border-base-100 rounded-full">
            <Link
              data-tooltip-id="usr-nm"
              data-tooltip-content={userData.nameVal}
              data-tooltip-place="left"
              className="btn btn-circle size-12 p-1"
              to="/dashboard"
            >
              <img
                src={userData.photoVal}
                className="object-fill aspect-square rounded-full"
                alt="usrIMG"
              />
            </Link>
            <button
              onClick={() => {
                signOutUser();
                navigate("/");
              }}
              className="btn btn-outline btn-error rounded-full"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <ul className="menu menu-horizontal p-1 items-center border border-base-100 rounded-xl">
            <li>
              <NavLink
                to="/login"
                className="border-r border-base-300 rounded-r-none rounded-l-lg"
              >
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className="border-l border-base-300 rounded-r-lg rounded-l-none"
              >
                Sign up
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <Tooltip id="usr-nm" />
    </div>
  );
};

export default Navbar;
