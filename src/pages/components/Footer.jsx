import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import gamer from "../../assets/gamer.png"

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <img src={gamer} alt="gamerdude" className="size-20" />
        <p>Copyright © {new Date().getFullYear()} - All right reserved Chill Gamer News Inc.</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-2xl">
        <a>
          <FaGithub />
        </a>
        <a>
          <FaBluesky />
        </a>
        <a>
          <FaFacebook />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
