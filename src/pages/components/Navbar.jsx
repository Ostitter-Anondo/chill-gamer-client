import { BiJoystickButton } from "react-icons/bi";
import { Link, NavLink } from "react-router";
import chillGamer from "../../assets/chill-gamer.png";
import { useContext } from "react";
import Context from "../../utils/Context";

import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { userData, signOutUser } = useContext(Context);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
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
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {userData ? (
          <div className="menu menu-horizontal items-center gap-3 border border-base-100 rounded-xl">
            <Link
              data-tooltip-id="usr-nm"
              data-tooltip-content={userData.nameVal}
              data-tooltip-place="bottom-start"
              className="btn btn-circle size-12 p-1"
              to="/dashboard"
            >
              <img
                src={userData.photoVal}
                className="object-fill aspect-square rounded-full"
                alt="usrIMG"
              />
            </Link>
            <button onClick={()=>signOutUser()} className="btn btn-outline btn-error rounded-full">Sign Out</button>
          </div>
        ) : (
          <ul className="menu menu-horizontal p-1 items-center border border-base-100 rounded-xl">
            <li>
              <NavLink to="/login" className="border-r border-base-300 rounded-r-none rounded-l-lg">
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="border-l border-base-300 rounded-r-lg rounded-l-none">
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
