import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow, AutoPlay, Fade } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import blogging from "../../assets/blogging.png"
import editProfile from "../../assets/editProfile.png"
import gameConsole from "../../assets/game-console.png"
import gaming from "../../assets/gaming.png"
import news from "../../assets/news.png"
import watchlist from "../../assets/watchlist.png"

const Banner = () => {

  const plugins = [
    new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
    new Fade(),
    new Arrow(),
  ];
  return (
    <div className="w-full h-64">
      <Flicking circular={true} plugins={plugins}>
        <div className="panel card bg-base-100 flex-row h-52 w-96 m-3 shadow-xl">
          <figure className="p-6">
            <img src={gaming} alt="website" className="object-contain" />
          </figure>
          <div className="card-body justify-end">
            <div className="card-actions justify-end text-right">
              <h2 className="font-bold">A state of the art review website</h2>
              <p className="text-sm">
                Fully featured and fullstack, built on React JS and MongoDB, based on the MERN stack.
              </p>
            </div>
          </div>
        </div>
        <div className="panel card bg-base-100 flex-row h-52 w-96 m-3 shadow-xl">
          <figure className="p-6">
            <img src={news} alt="news" />
          </figure>
          <div className="card-body justify-end">
            <div className="card-actions justify-end text-right">
              <h2 className="font-bold">Post news and articles!</h2>
              <p className="text-sm">Easy, simple and functional system for submitting articles, connected to a real backend!</p>
            </div>
          </div>
        </div>
        <div className="panel card bg-base-100 flex-row h-52 w-96 m-3 shadow-xl">
          <figure className="p-6">
            <img src={gameConsole} alt="gameStuff" />
          </figure>
          <div className="card-body justify-end">
            <div className="card-actions justify-end text-right">
              <h2 className="font-bold">Latest game reviews</h2>
              <p className="text-sm">
                All your favorite new games reviewed right here right now, check them out!
              </p>
            </div>
          </div>
        </div>
        <div className="panel card bg-base-100 flex-row h-52 w-96 m-3 shadow-xl">
          <figure className="p-6">
            <img src={blogging} alt="blogs" />
          </figure>
          <div className="card-body justify-end">
            <div className="card-actions justify-end text-right">
              <h2 className="font-bold">
                Easy editing of blogs
              </h2>
              <p className="text-sm">
                Edit and correct the mistakes you made in your reviews more easily than you would fix your life&apos;s mistakes!
              </p>
            </div>
          </div>
        </div>
        <div className="panel card bg-base-100 flex-row h-52 w-96 m-3 shadow-xl">
          <figure className="p-6">
            <img src={watchlist} alt="watchlist" />
          </figure>
          <div className="card-body justify-end">
            <div className="card-actions justify-end text-right">
              <h2 className="font-bold">Maintain a watchlist for games you are looking to buy!</h2>
              <p className="text-sm">
                Planning to buy a new game? keep track of your plans with our innovative watchlist!
              </p>
            </div>
          </div>
        </div>
        <div className="panel card bg-base-100 flex-row h-52 w-96 m-3 shadow-xl">
          <figure className="p-6">
            <img src={editProfile} alt="profile" />
          </figure>
          <div className="card-body justify-end">
            <div className="card-actions justify-end text-right">
              <h2 className="font-bold">Personalize your profile with an intuitive dashboard!</h2>
              <p className="text-sm">
                Make your profile truly yours, make it carry your own flare with your personal image and name! 
              </p>
            </div>
          </div>
        </div>
        <ViewportSlot>
          <span className="flicking-arrow-prev is-thin"></span>
          <span className="flicking-arrow-next is-thin"></span>
        </ViewportSlot>
      </Flicking>
    </div>
  );
};

export default Banner;
