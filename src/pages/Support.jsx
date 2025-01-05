import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BiTargetLock } from "react-icons/bi";
import toast from "react-hot-toast";

const Support = () => {
  const fnyBizness = ()=>{
    toast.success(`Look at mr rich guy over here, moneybag too full? jk, I don't really need your money.`, {
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
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer</title>
        </Helmet>
      </HelmetProvider>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex flex-col gap-12 text-justify py-12">
        <div className="flex flex-col gap-6 w-8/12 mx-auto">
          <h1 className="font-bold text-3xl text-warning">
            Support Our Cause!
          </h1>
          <p>
            <b>Chill Gamer</b> is a website hosted on the internet and makes use
            of internet services, and said services require money. We at{" "}
            <b>Chill Gamer</b> believe that the best content is free content. If
            you like what you see here and want us to continue doing the good
            work, fighting the good fight without having to resort to bad
            advertisement practices, please consider donating!
          </p>
          <p>
            <b>Chill Gamer</b> is built with love and care, and we hope that you
            will continue to support us in maintaining a beautiful internet
            platform. No pressure, the choice is entirely yours!
          </p>
          <hr className="border-1 border-accent" />
        </div>
        <div className="w-10/12 mx-auto grid lg:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-12 bg-base-200 p-6 rounded">
            <h1 className="font-extrabold text-7xl text-success">$100</h1>
            <hr className="w-full" />
            <h3 className="font-bold text-3xl text-yellow-400 rounded-lg bg-blue-100 p-3">Gold Tier</h3>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-xl flex items-center gap-1">
                <BiTargetLock className="text-error" />
                <span>+31 Luck for 1 year</span>
              </h2>
              <p className="flex items-center gap-1">
                <BiTargetLock className="text-info" />
                <span>fny stuff happens</span>
              </p>
              <p className="flex items-center gap-1">
                <BiTargetLock className="text-info" />
                <span>probably some other things</span>
              </p>
            </div>
            <button onClick={fnyBizness} className="btn btn-success btn-lg btn-wide">Donate!</button>
          </div>
          <div className="flex flex-col items-center gap-12 bg-base-200 p-6 rounded">
            <h1 className="font-extrabold text-7xl text-success">$50</h1>
            <hr className="w-full" />
            <h3 className="font-bold text-3xl text-gray-400 rounded-lg bg-blue-100 p-3">Silver Tier</h3>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-xl flex items-center gap-1">
                <BiTargetLock className="text-error" />
                <span>+20 Luck for 6 months</span>
              </h2>
              <p className="flex items-center gap-1">
                <BiTargetLock className="text-info" />
                <span>one amusing thing happens</span>
              </p>
              <p className="flex items-center gap-1">
                <BiTargetLock className="text-info" />
                <span>probably a few other things</span>
              </p>
            </div>
            <button onClick={fnyBizness} className="btn btn-success btn-lg btn-wide">Donate!</button>
          </div>
          <div className="flex flex-col items-center gap-12 bg-base-200 p-6 rounded">
            <h1 className="font-extrabold text-7xl text-success">$10</h1>
            <hr className="w-full" />
            <h3 className="font-bold text-3xl text-purple-500 rounded-lg bg-blue-100 p-3">Amethyst Tier</h3>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-xl flex items-center gap-1">
                <BiTargetLock className="text-error" />
                <span>+8 Luck for 1 month</span>
              </h2>
              <p className="flex items-center gap-1">
                <BiTargetLock className="text-info" />
                <span>one normal thing happens</span>
              </p>
              <p className="flex items-center gap-1">
                <BiTargetLock className="text-info" />
                <span>nothing else</span>
              </p>
            </div>
            <button onClick={fnyBizness} className="btn btn-success btn-lg btn-wide">Donate!</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Support;
