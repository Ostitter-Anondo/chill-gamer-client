import { BiJoystickButton } from "react-icons/bi";
import { Link, NavLink } from "react-router";
import chillGamer from "../../assets/chill-gamer.png";
import { useContext } from "react";
import Context from "../../utils/Context";

import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { userData, signOutUser, lightTheme, setLightTheme } = useContext(Context);

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
        <a className="btn btn-ghost text-xl">
          <img className="size-7" src={chillGamer} alt="chill" /> Chill Gamer
        </a>
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="dim"
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            onChange={()=>setLightTheme(!lightTheme)}
            checked ={!lightTheme}
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
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
              onClick={() => signOutUser()}
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
