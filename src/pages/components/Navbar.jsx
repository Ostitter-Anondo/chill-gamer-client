import { BiJoystickButton } from "react-icons/bi";
import { Link, NavLink } from "react-router";
import chillGamer from "../../assets/chill-gamer.png";
import { useContext } from "react";
import Context from "../../utils/Context";

const Navbar = () => {
  const { currentUser } = useContext(Context);

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
    <div className="navbar bg-base-100">
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
        {currentUser ? (
          <button onClick={() => console.log(currentUser)} className="btn">
            Button
          </button>
        ) : (
          <Link className="btn" to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
